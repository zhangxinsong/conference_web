<template>
	<div class="tree-dep-wrap">
		<!-- 搜索 -->
		<search-input @change="keyWordChange" style="display:none"/>

		<!-- keyword不为空显示平级结构 -->
		<!-- <div class="search-wrap man_scroll" v-if=" keyWord!='' ">
			<li v-for="each in list" class="li cp" @click="checkEach(each)">
				<div class="head-wrap l">
					<avatar :name="each.deptName" type="dept" :size="'28px'"/>
				</div>
				<div class="deptName l">
					{{each.deptName}}
				</div>
				<div class="r">
					<Checkbox class="cbx" style="pointer-events:none" :value="each.checked"/>
				</div>
			</li>
			<li class="ajaxStatus">
				<Spin class="auto" v-if="ajaxStatus=='loading'"/>
				<span v-if="ajaxStatus=='over'">已加载全部</span>
				<span class="cp" v-if="ajaxStatus=='success'">加载更多</span>
				<span class="cp" v-if="ajaxStatus=='error'">加载失败 <span class="cp" style="color:#1FDA9A" @click="getList">重新加载</span></span>
			</li>
		</div> -->

		<!-- keyword为空显示树形结构 -->
		<div v-if=" keyWord=='' " class="man_scroll" style="padding:0 15px 0 25px;">
			<tree-dep :ROOT="ROOT"/>
		</div>

	</div>
</template>
<script type="text/javascript">

	import avatar from './avatar';
	import searchInput from './search-input.vue';
	import TreeDep from './tree-dep';

	export default{
		props:['ROOT'],
		components:{
			avatar , 
			searchInput , 
			TreeDep
		},

		data(){
			return {
				ajaxStatus:'loading',  // loding---加载中 success---加载更多 error---加载失败 over--全部;
				keyWord:'',
				list:[]
			}
		},

		watch:{
			// 储存变量 , 设置默认值
			list(){
				this.ROOT.saveAjaxDep = this.list ;
			}
		},

		methods:{
			keyWordChange( kw ){
				this.keyWord = kw ;
				if(kw){
					this.keyWordChangeGetList();
				} 
			},
			keyWordChangeGetList(){
				// 默认地址
            	this.$axios({
	                url: '/organization/dept/deptUsers',
	                data: {
	                	keyWord : this.keyWord 
	                },
	                success: (res)=>{
	                	if( res.flag==0 ){

	                		this.ajaxStatus = 'over' ;
	                	}else {
	                		this.ajaxStatus = 'error' ;
	                	}
	                },
	                error:(res)=>{
	                	this.ajaxStatus = 'error' ;
	                }
	            });			
			},

            checkEach( each ){
            	if( !each.checked ){
            		//限制 ;
					if( !this.ROOT.checkLimit() ){ return };

            		// 添加右侧
            		this.ROOT.right_add('dep',each);
            	}else {
            		// 删除右侧
            		this.ROOT.right_del('dep',each);
            	};
            }
		}
	}
</script>
<style lang="less" scoped>
	.tree-dep-wrap{
		.avatar-wrapper .name{
			font-size: 12px;
		}
		.tree-wrap{
			padding: 0 15px 0 25px;
		}
		.search-wrap .li{
			font-size: 13px;
			overflow: hidden;
			line-height: 28px;
			padding: 5px 15px 5px 22px;
			&:hover{
				background:rgba(126,231,192,0.1);
			}
			.head-wrap{
				width: 28px;height: 28px;
				// background: #f0f0f0;
				// border-radius: 50%;
				font-size: 0;
			}
			.deptName{
				margin-left: 8px;
				width: 80%;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}
		.search-wrap .li:nth-of-type(1){
			padding-top: 12px;
		}
		.ajaxStatus{
			text-align: center;
			padding: 10px 0 15px 0;
			&>span{
				font-size: 12px;
				padding: 0 10px;
			}
		}
		.man_scroll{
			position: absolute;
			top: 47px;
			top:0;
			bottom: 0px;
			left: 0px;right: 0px;
			overflow-y: auto;
		}
	}
</style>