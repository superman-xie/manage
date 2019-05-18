<template>
    <!--模态框-->
    <el-dialog title="添加商品类别" :visible="visible" @update:visible="v=>$emit('update:visible',v)">
        <!--<el-dialog title="添加店铺类别" :visible.sync="visible">-->
        <el-form :model="smallGoodsTypeForm" ref="smallGoodsTypeForm">
            <el-form-item label="商品类别名称" label-width="" prop="smallGoodsTypeName">
                <el-input v-model="smallGoodsTypeForm.smallGoodsTypeName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品总类别：" prop="goodsTypeId">
                <el-select v-model="smallGoodsTypeForm.goodsTypeId" placeholder="请选择">
                    <!--key唯一标识   label  下拉框显示的值   value  普通的value值-->
                    <el-option
                            v-for="item in $store.state.goodsType.allGoodsType"
                            :key="item._id"
                            :label="item.goodsTypeName"
                            :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品类别排序" label-width="" prop="orderBy">
                <el-input v-model="smallGoodsTypeForm.orderBy" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="店商品类别是否现在显示：" label-width="" prop="smallGoodsIsShow">
                <el-radio-group v-model="smallGoodsTypeForm.smallGoodsIsShow">
                    <el-radio :label="1" name="isShow">是</el-radio>
                    <el-radio :label="2" name="isShow">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-upload
                        :data="smallGoodsTypeForm"
                        class="upload-demo"
                        :action="actionURL"
                        :headers="headers"
                        name="smallGoodsTypePic"
                        :auto-upload="false"
                        :limit="1"
                        :on-success="upSuccess"
                        ref="upload"
                        :file-list="fileList"
                        list-type="picture">
                    <el-button @click="picRemove" size="small" >点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <!--设置窗口弹出的关闭-->
            <el-button @click="$emit('update:visible',false)">取 消</el-button>
            <!--调用函数 addGoodsType-->
            <el-button  type="success" @click="addSmallGoodsType">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import Vue from "vue";
    export default {
        name: "addSmallGoodsType",
        data(){
            return {
                //要传入数据库的数
                smallGoodsTypeForm:{
                    smallGoodsIsShow: '',
                    smallGoodsTypeName : '',
                    smallGoodsTypePic : '',
                    orderBy : '',
                    goodsTypeId : '',
                    smallGoodsTypeId : ''
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
        props:["visible","isUpdate"],
        methods:{
            //点击按钮添加或修改小商品信息
            addSmallGoodsType(){
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
                    this.$refs.smallGoodsTypeForm.resetFields();
                    //清除图片上传
                    this.$refs.upload.clearFiles();
                    //关闭窗口
                    this.$emit('update:visible',false);
                    //提示成功
                    this.$message.success(res.msg);
                    //添加成功，重新加载数据
                    this.$store.dispatch("getSmallGoodsType",{pageIndex:1});
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
        watch : {
            //监听传入的isUpdate
            isUpdate(newValue,oldValue){
                console.log(newValue,oldValue)
                //判断传入的新数据是否为 true
                if(newValue){
                    console.log(this.fileList)
                    // 如果传入的是true 证明是修改按钮 将获得到的值传入到input中
                    //点击编辑时将URL地址转换编辑的地址
                    this.actionURL = "/chus/upSmallGoodsType/";
                    Vue.prototype.$bus.$on("findOneBySmall",()=>{
                        //简写代码
                        var goodsInfo = this.$store.state.goodsType.oneGoodsType;
                        //设置加载中
                        this.$store.state.fullscreenLoading = true;
                        //将ID赋值给form 中
                        this.smallGoodsTypeForm.smallGoodsTypeId = goodsInfo._id;
                            //赋值名字
                        this.smallGoodsTypeForm.smallGoodsTypeName= goodsInfo.smallGoodsTypeName;
                        //赋值是否显示
                        this.smallGoodsTypeForm.smallGoodsIsShow = goodsInfo.smallGoodsIsShow;
                        //赋值ID
                        this.smallGoodsTypeForm.goodsTypeId = goodsInfo.goodsTypeId;
                        //赋值图片名称
                        this.smallGoodsTypeForm.smallGoodsTypePic = goodsInfo.smallGoodsTypePic;
                        //赋值序号
                        this.smallGoodsTypeForm.orderBy = goodsInfo.orderBy;
                        //设置添加的图片
                        this.fileList.push({name : goodsInfo.smallGoodsTypePic,url : this.$store.state.config.baseUrl + goodsInfo.smallGoodsTypePic});
                        this.$store.state.fullscreenLoading = false;
                    });
                }
                if(!newValue){ // 如果传入的是false 证明是添加按钮 将表单中的数据清空

                    //点击添加时将URL地址转换添加的地址
                    this.actionURL = "/smallGoodsType/";
                    //清除表单中的值，表单的prop必写才能有效果
                    // this.$refs.smallGoodsTypeForm.resetFields();
                    //清除图片上传
                    // this.$refs.upload.clearFiles();
                    this.fileList = [];
                }
            },
            //监听窗口关闭状态
            visible(newValue,oldValue){
                //如果值为false 删除添加的图片
                if(!newValue){
                    this.$refs.upload.clearFiles();
                    this.fileList = [];
                }


            }
        },
        mounted(){
            this.fileList = [];
            Vue.prototype.$bus.$on("outLogin",()=>{
                this.$store.commit("OUT_LOGIN");
            })
            this.$store.dispatch("getAllGoodsType");
        }
    }
</script>

<style scoped>
    .el-radio__inner{
    background:red !important;
    border-color:red !important ;
}
</style>