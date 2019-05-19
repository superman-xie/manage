<template>
    <!--模态框-->
    <el-dialog title="添加商品" top="4vh" :visible="visible" @update:visible="v=>$emit('update:visible',v)">
        <!--<el-dialog title="添加店铺类别" :visible.sync="visible">-->
        <el-form :model="goodsFrom" ref="goodsFrom">
            <el-form-item label="商品名称：" label-width="" prop="goodsName">
                <el-input :autofocus="true" v-model="goodsFrom.goodsName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品详情信息：" label-width="" prop="goodsInfo">
                <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="goodsFrom.goodsInfo"
                        maxlength="30"
                        show-word-limit
                        resize="none"
                />
            </el-form-item>
            <el-form-item label="所属商品小类别：" prop="smallGoodsTypeId">
                <el-select v-model="goodsFrom.smallGoodsTypeId" placeholder="请选择">
                    <!--key唯一标识   label  下拉框显示的值   value  普通的value值-->
                    <el-option
                            v-for="item in $store.state.goodsType.allSmallGoodsTypeList"
                            :key="item._id"
                            :label="item.smallGoodsTypeName"
                            :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品排序：" prop="price">
                <el-col :span="4">
                    <el-input v-model="goodsFrom.orderBy" autocomplete="off" placeholder="请输入数字"></el-input>
                </el-col>
                <el-col :span="2" :offset="1">
                    商品价格：
                </el-col>
                <el-col :span="4">
                    <el-input v-model="goodsFrom.originalPrice" autocomplete="off" placeholder="原价"></el-input>
                </el-col>
                <el-col :span="0.6" style="margin-left: 20px">
                    &nbsp
                </el-col>
                <el-col :span="4">
                    <el-input v-model="goodsFrom.currentPrice" autocomplete="off" placeholder="现价"></el-input>
                </el-col>
                <el-col :span="0.6" style="margin-left: 20px">
                    &nbsp
                </el-col>
                <el-col :span="4">
                    <el-input v-model="goodsFrom.clickSum" autocomplete="off" placeholder="商品点击量"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="商品信息：" label-width="" prop="info">
                <el-col :span="3">
                    <el-input v-model="goodsFrom.goodsPlace" autocomplete="off" placeholder="商品产地"></el-input>
                </el-col>
                <el-col :span="0.4" style="margin-left: 20px">
                    &nbsp
                </el-col>
                <el-col :span="3">
                    <el-input v-model="goodsFrom.goodsSpecs" autocomplete="off" placeholder="商品规格"></el-input>
                </el-col>
                <el-col :span="0.4" style="margin-left: 20px">
                    &nbsp
                </el-col>
                <el-col :span="3">
                    <el-input v-model="goodsFrom.storageTime" autocomplete="off" placeholder="商品保质期"></el-input>
                </el-col>
                <el-col :span="0.4" style="margin-left: 20px">
                    &nbsp
                </el-col>
                <el-col :span="3">
                    <el-input v-model="goodsFrom.storageRequire" autocomplete="off" placeholder="商品储存条件"></el-input>
                </el-col>
                <el-col :span="0.4" style="margin-left: 20px">
                    &nbsp
                </el-col>
                <el-col :span="3">
                    <el-input v-model="goodsFrom.goodsNum" autocomplete="off" placeholder="商品库存"></el-input>
                </el-col>
            </el-form-item>


            <el-form-item label="商品是否现在显示：" label-width="" prop="isShow">
                <el-col :span="4">
                    <el-radio-group v-model="goodsFrom.isShow">
                        <el-radio :label="1" name="isShow">是</el-radio>
                        <el-radio :label="2" name="isShow">否</el-radio>
                    </el-radio-group>
                </el-col>
                <el-col :span="6">
                 商品是否优选
                    <el-radio-group v-model="goodsFrom.isPreference"  style="margin-left: 20px;">
                        <el-radio :label="1" name="isPreference">是</el-radio>
                        <el-radio :label="2" name="isPreference">否</el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="商品显示小图片：">
                <el-upload
                        :data="goodsFrom"
                        class="upload-demo"
                        action="/chu/addGoods/"
                        :headers="headers"
                        name="goodsSmallPic"
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
        name: "addGoods",
        data(){
            return {
                //要传入数据库的数
                goodsFrom:{
                    goodsName: '',
                    goodsInfo:'',
                    originalPrice : null,
                    currentPrice :null,
                    orderBy : null,
                    clickSum : null,
                    isShow : 1,
                    goodsPlace: '',    //商品产地
                    goodsSpecs: '',     //商品规格
                    storageTime: '',    //保质期
                    storageRequire: '',   //商品储存条件
                    isPreference: 1,    //是否优选
                    goodsNum: ''        //商品库存
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
                    this.$refs.goodsFrom.resetFields();
                    //清除图片上传
                    this.$refs.upload.clearFiles();
                    //关闭窗口
                    this.$emit('update:visible',false);
                    //提示成功
                    this.$message.success(res.msg);
                    //添加成功，重新加载数据
                    this.$store.dispatch("getGoodsList",{pageIndex:1})
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
                //判断传入的新数据是否为 true
                if(newValue){
                    // 如果传入的是true 证明是修改按钮 将获得到的值传入到input中
                    //点击编辑时将URL地址转换编辑的地址
                    this.actionURL = "/chu/upSmallGoodsType/";
                    Vue.prototype.$bus.$on("findOneBySmall",()=>{
                        //简写代码
                        var goodsInfo = this.$store.state.goodsType.oneGoodsType;
                        //设置加载中
                        this.$store.state.fullscreenLoading = true;
                        //将ID赋值给form 中
                        this.goodsFrom.smallGoodsTypeId = goodsInfo._id;
                        //赋值名字
                        this.goodsFrom.smallGoodsTypeName= goodsInfo.smallGoodsTypeName;
                        //赋值是否显示
                        this.goodsFrom.smallGoodsIsShow = goodsInfo.smallGoodsIsShow;
                        //赋值ID
                        this.goodsFrom.goodsTypeId = goodsInfo.goodsTypeId;
                        //赋值图片名称
                        this.goodsFrom.smallGoodsTypePic = goodsInfo.smallGoodsTypePic;
                        //赋值序号
                        this.goodsFrom.orderBy = goodsInfo.orderBy;
                        //设置添加的图片
                        this.fileList.push({name : goodsInfo.smallGoodsTypePic,url : this.$store.state.config.baseUrl + goodsInfo.smallGoodsTypePic});
                        this.$store.state.fullscreenLoading = false;
                    });
                }else{ // 如果传入的是false 证明是添加按钮 将表单中的数据清空
                    //点击添加时将URL地址转换添加的地址
                    this.actionURL = "/chu/smallGoodsType/";
                    //清除表单中的值，表单的prop必写才能有效果
                    this.$refs.goodsFrom.resetFields();
                    //清除图片上传
                    this.$refs.upload.clearFiles();
                    this.fileList = [];
                }
            },
            //监听窗口关闭状态
            visible(newValue,oldValue){
                //如果值为false 删除添加的图片
                if(!newValue){
                    this.fileList = [];
                }
            }
        },
        mounted(){
            this.fileList = [];
            Vue.prototype.$bus.$on("outLogin",()=>{
                this.$store.commit("OUT_LOGIN");
            })
            this.$store.dispatch("getAllSmallGoodsTypeList");
        }
    }
</script>
<style scoped>
    .el-radio__inner{
        background:red !important;
        border-color:red !important ;
    }
</style>