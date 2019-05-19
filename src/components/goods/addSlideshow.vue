<template>
    <!--模态框-->
    <el-dialog title="添加详情页图片" top="4vh" :visible="addSlideShow" @update:visible="v=>$emit('update:addSlideShow',v)">
        <!--<el-dialog title="添加店铺类别" :visible.sync="visible">-->
        <el-form :model="slideShow" ref="addSlideShowForm">
            <el-form-item label="所属商品：" prop="smallGoodsTypeId">
                <el-select v-model="slideShow.goodsId" placeholder="请选择">
                    <!--key唯一标识   label  下拉框显示的值   value  普通的value值-->
                    <el-option
                            v-for="item in $store.state.goods.allGoodsList"
                            :key="item._id"
                            :label="item.goodsName"
                            :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图片描述信息：" label-width="" prop="goodsDetailsPicInfo">
                <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="slideShow.slideShowInfo"
                        maxlength="30"
                        show-word-limit
                        resize="none"
                />
            </el-form-item>
            <el-form-item label="图片排序：" label-width="" prop="orderBy">
                <el-col :span="4">
                    <el-input v-model="slideShow.orderBy" autocomplete="off" placeholder=" 请输入数字"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="图片：">
                <el-upload
                        :data="slideShow"
                        class="upload-demo"
                        action="/chu/addSlideShowPic/"
                        :headers="headers"
                        name="slideShowPic"
                        :auto-upload="false"
                        :limit="1"
                        :on-success="upSuccess"
                        ref="upload"
                        :file-list="fileList"
                        list-type="picture">
                    <el-button @click="picRemove" size="small" >点击上传</el-button>
                    <!--<i class="el-icon-plus"></i>-->
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否显示：">
                <el-radio-group v-model="slideShow.isShow">
                    <el-radio :label="1" name="isShow">是</el-radio>
                    <el-radio :label="2" name="isShow">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-form>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <!--设置窗口弹出的关闭-->
            <el-button @click="$emit('update:addSlideShow',false)">取 消</el-button>
            <!--调用函数 addGoodsType-->
            <el-button  type="success" @click="addGoodsDetailsPic">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import Vue from "vue";
    export default {
        name: "addslideShow",
        data(){
            return {
                //要传入数据库的数
                slideShow:{
                    slideShowInfo : '',   //图片描述
                    goodsId : '',    //商品名称
                    isShow : 1,       //是否显示
                    orderBy : ''      //排序
                },
                //点击不同按钮是切换URL
                actionURL : '',
                //图片列表
                fileList : [],
                //设置上传头部信息，用于验证token
                headers:{
                    "Authorization" : localStorage.token
                }
            }
        },
        // visible 控制窗口的关闭开启  isUpdate  传入一个布尔值 用来判断按钮的功能 true 是修改按钮 false 是添加按钮
        props:["addSlideShow","isUpdate"],
        methods:{
            //点击按钮添加或修改小商品信息
            addGoodsDetailsPic(){
                this.$refs.upload.submit();
            },
            //点击按钮清空图片列表
            picRemove(){
                this.$refs.upload.clearFiles();
            },
            //上传成功使用的函数
            upSuccess(res){
                //返回是1添加成功
                if(res.ok === 1){
                    //添加成功删除图片列表中的数据
                    this.fileList = [];
                    //清除表单中的值，表单的prop必写才能有效果
                    this.$refs.addSlideShowForm.resetFields();
                    //清除图片上传
                    this.$refs.upload.clearFiles();
                    //关闭窗口
                    this.$emit('update:addSlideShow',false);
                    //提示成功
                    this.$message.success(res.msg);
                    //添加成功，重新加载数据
                    this.$store.dispatch("slideShowPicList");
                    //返回 -4 是token 过期
                }else if(res.ok === -4){
                    Vue.prototype.$alert("你的登录已超时","系统消息",{
                        showClose : true,
                        confirmButtonClass : "clearBtn",
                        callback: function(){
                            //获取不到this  使用了bus
                            Vue.prototype.$bus.$emit("outLogin")
                        }.bind(this)
                    })
                }else{

                }
            },
        },
        //监听
        // watch : {
        //     //监听传入的isUpdate
        //     isUpdate(newValue,oldValue){
        //         //判断传入的新数据是否为 true
        //         if(newValue){
        //             // 如果传入的是true 证明是修改按钮 将获得到的值传入到input中
        //             //点击编辑时将URL地址转换编辑的地址
        //             this.actionURL = "/chu/upSmallGoodsType/";
        //             Vue.prototype.$bus.$on("findOneBySmall",()=>{
        //                 //简写代码
        //                 var goodsInfo = this.$store.state.goodsType.oneGoodsType;
        //                 //设置加载中
        //                 this.$store.state.fullscreenLoading = true;
        //                 //将ID赋值给form 中
        //                 this.goodsDetailsFrom.smallGoodsTypeId = goodsInfo._id;
        //                 //赋值名字
        //                 this.goodsDetailsFrom.smallGoodsTypeName= goodsInfo.smallGoodsTypeName;
        //                 //赋值是否显示
        //                 this.goodsDetailsFrom.smallGoodsIsShow = goodsInfo.smallGoodsIsShow;
        //                 //赋值ID
        //                 this.goodsDetailsFrom.goodsTypeId = goodsInfo.goodsTypeId;
        //                 //赋值图片名称
        //                 this.goodsDetailsFrom.smallGoodsTypePic = goodsInfo.smallGoodsTypePic;
        //                 //赋值序号
        //                 this.goodsDetailsFrom.orderBy = goodsInfo.orderBy;
        //                 //设置添加的图片
        //                 this.fileList.push({name : goodsInfo.smallGoodsTypePic,url : this.$store.state.config.baseUrl + goodsInfo.smallGoodsTypePic});
        //                 this.$store.state.fullscreenLoading = false;
        //             });
        //         }else{ // 如果传入的是false 证明是添加按钮 将表单中的数据清空
        //             //点击添加时将URL地址转换添加的地址
        //             this.actionURL = "/chu/smallGoodsType/";
        //             //清除表单中的值，表单的prop必写才能有效果
        //             this.$refs.goodsDetailsFrom.resetFields();
        //             //清除图片上传
        //             this.$refs.upload.clearFiles();
        //             this.fileList = [];
        //         }
        //     },
        //     //监听窗口关闭状态
        //     visible(newValue,oldValue){
        //         //如果值为false 删除添加的图片
        //         if(!newValue){
        //             this.fileList = [];
        //         }
        //     }
        // },
        mounted(){
            this.fileList = [];
            Vue.prototype.$bus.$on("outLogin",()=>{
                this.$store.commit("OUT_LOGIN");
            })
            this.$store.dispatch("getAllGoodsList");
        }
    }
</script>
<style scoped>
    .el-radio__inner{
        background:red !important;
        border-color:red !important ;
    }
</style>