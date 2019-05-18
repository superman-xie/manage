<template>
    <!--模态框-->
    <el-dialog title="添加商品类别" :visible="visible" @update:visible="v=>$emit('update:visible',v)">
        <!--<el-dialog title="添加店铺类别" :visible.sync="visible">-->
        <el-form :model="form" ref="myForm">
            <el-form-item label="商品类别名称" label-width="" prop="goodsTypeName">
                <el-input v-model="form.goodsTypeName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品类别排序" label-width="" prop="goodsTypeSort">
                <el-input v-model="form.orderBy" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="店商品类别是否现在显示：" label-width="">
                <el-radio-group v-model="form.goodsIsShow">
                    <el-radio :label="1" name="isShow">是</el-radio>
                    <el-radio :label="2" name="isShow">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <!--设置窗口弹出的关闭-->
            <el-button @click="$emit('update:visible',false)">取 消</el-button>
            <!--调用函数 addGoodsType-->
            <el-button @click="addGoodsType" type="success">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import Vue from "vue";
    export default {
        name: "addgoodsType",
        data(){
            return {
                //要传入数据库的数
                form:{
                    goodsTypeName: '',
                    goodsIsShow : '',
                    orderBy : '',
                },
            }
        },
        // visible 控制窗口的关闭开启  isUpdate  传入一个布尔值 用来判断按钮的功能 true 是修改按钮 false 是添加按钮
        props:["visible","isUpdate"],
        methods:{
            addGoodsType(){
                if(this.isUpdate){
                    //修改按钮时，调用修改函数，将要修改的数据传入到axios
                    this.$store.dispatch("upGoodsType",{
                        goodsTypeName:this.form.goodsTypeName,
                        goodsIsShow : this.form.goodsIsShow,
                        orderBy : this.form.orderBy,
                        id : this.$store.state.goodsType.oneGoodsType._id
                    })
                }else{
                    //添加按钮时，调用添加函数，将要添加的数据传入到axios
                    this.$store.dispatch("addGoodsType",this)
                }

            }
        },
        //监听
        // watch : {
        //     //监听传入的isUpdate
        //     isUpdate(newValue,oldValue){
        //         //判断传入的新数据是否为 true
        //         if(newValue){
        //             // 如果传入的是true 证明是修改按钮 将获得到的值传入到input 中
        //             Vue.prototype.$bus.$on("findOne",()=>{
        //                 this.$store.state.fullscreenLoading = true;
        //                 this.form.goodsTypeName=this.$store.state.goodsType.oneGoodsType.goodsTypeName;
        //                 this.form.goodsIsShow = this.$store.state.goodsType.oneGoodsType.goodsIsShow;
        //                 this.form.orderBy = this.$store.state.goodsType.oneGoodsType.orderBy;
        //                 this.$store.state.fullscreenLoading = false;
        //
        //             });
        //         }else{ // 如果传入的是false 证明是添加按钮 将表单中的数据清空
        //             console.log(this.isUpdate)
        //             this.form.goodsTypeName='';
        //             this.form.goodsIsShow = '';
        //             this.form.orderBy = '';
        //         }
        //     }
        // },
        mounted(){

        }
    }
</script>

<style scoped>
    .el-radio__inner{
    background:red !important;
    border-color:red !important ;
}
</style>