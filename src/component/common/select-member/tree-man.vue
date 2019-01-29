<template>
	<div class="tree-man">
		<search-input @change="keyWordChange"/>

		<ul class="man_scroll">
			<li class="li cp" v-for="each in list" @click="checkEach(each)">
				<div class="head-wrap l">
					<avatar :avatar="each.avatar" :name="each.name" fontSize="12px" :size="'28px'"/>
				</div>
				<div class="userName l">
					{{each.name}}
				</div>
				<div class="r">
					<!-- Checkbox阻止事件 -->
					<Checkbox class="cbx" style="pointer-events:none" :value="each.checked"/>
				</div>				
			</li>
			<li class="ajaxStatus">
				<Spin class="auto" v-if="ajaxStatus=='loading'"/>
				<span v-if="ajaxStatus=='over'">已加载全部</span>
				<span class="cp" v-if="ajaxStatus=='success'" @click="add">加载更多</span>
				<span class="cp" v-if="ajaxStatus=='error'">加载失败 <span class="cp" style="color:#1FDA9A" @click="getList">重新加载</span></span>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import avatar from './avatar';
	import searchInput from './search-input.vue';
	export default{
		props:['info','ROOT'],
		components:{
			avatar , 
			searchInput
		},

		data(){
			return {
				ajaxStatus:'loading',  // loding---加载中 success---加载更多 error---加载失败 over--全部;
				keyWord:'',
				pageSize: 40,
				pageNum: 1,
				list:[],
			}
		},
		watch:{
			// 储存变量 , 设置默认值
			list(){
				// 人员列表会随着搜索清空 请求数据的时候也需要验证
				this.ROOT.saveAjaxMan = this.list ;
			}
		},

		mounted(){
			this.getList();
		},
		methods:{
			keyWordChange( kw ){
			  if( this.keyWord==kw ){ return };
				this.keyWord = kw ;
				this.list    = [];
				this.pageNum = 1;
				this.getList();
			},
			getList(){
				this.ajaxStatus = 'loading' ;
            	this.$axios({
	                url: `/rest/v1/upesn/selection/members`,
	                params: {
	                	size : this.pageSize,
						start : this.pageSize * (this.pageNum - 1),
	                	keyword  : this.keyWord
	                }
				}).
				then(res=>{
					let arr = res.member;
					arr.length >= this.pageSize ? this.ajaxStatus='success' : this.ajaxStatus='over' ;
					arr.map(v=>{
						v.checked=false ;
					})
					this.list= this.list.concat( arr );
				})
				.catch(res =>{
				})
			},
            add(){
            	this.pageNum++ ;
            	this.getList() ;
            },
            checkEach( each ){
            	if( !each.checked ){
            		//限制 ;
					if( !this.ROOT.checkLimit() ){ return };

            		// 添加右侧
            		this.ROOT.right_add('man',each);
            	}else {
            		// 删除右侧
            		this.ROOT.right_del('man',each);
            	};
            }
		}
	}
</script>
<style lang="less" scoped>
	.tree-man{
		.avatar-wrapper .name{
			font-size: 12px;
		}
		.man_scroll{
			position: absolute;
			top: 47px;bottom: 0px;
			left: 0px;right: 0px;
			overflow-y: auto;
		}
		.ajaxStatus{
			text-align: center;
			padding: 10px 0 15px 0;
			&>span{
				font-size: 12px;
				padding: 0 10px;
			}
		}
		.li{
			padding: 5px 15px 5px 22px;
			font-size: 13px;
			line-height: 28px;
			overflow: hidden;
			.head-wrap{
				width: 28px;height: 28px;
				font-size: 0;
			}
			.userName{
				margin-left: 8px;
			}
			&:hover{
				background:rgba(126,231,192,0.1);
			}
		}
		.li:nth-of-type(1){
			margin-top: 6px;
		}
	}
</style>