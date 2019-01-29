<template>
	<section class="section-dep">
		<div class="search-part">
			<search-input @search="search" :value="keyword"/>
		</div>
		<div class="search-content">

			<vsm-dep-tree-item 
				v-for="(item,k) in vsm.save.depList"
				:key="item.deptId"
				:type="'dep'"
				:data="item"/>

			<loading-status :loadingStatus="loadingStatus" @loadAgain="getList"/>
		</div>
	</section>
</template>
<script type="text/javascript">

	import searchInput from './vsm-search-input';
	import loadingStatus from './vsm-loading-status';	
	import vsmDepTreeItem from './vsm-dep-tree-item';

	export default{
		// 接受注入的祖先vsm ;
		inject:['vsm'],

		components:{
			searchInput ,
			loadingStatus ,
			vsmDepTreeItem 
		},

		data(){
			return {
				keyword:'',

				loadingStatus:'loading'
			}
		},

		created(){
			this.getList()
		},

		methods:{
			getList(){
				this.loadingStatus='loading';
				this.vsm.ajax_dep(0, this.keyword ,(arr)=>{
					arr.length>0?this.loadingStatus='success':this.loadingStatus='nodata';
					// 赋值
					this.vsm.save.depList = arr ;
					// 设置默认选中
					this.vsm.map_all_set_default('dep');
				},(e)=>{
					this.loadingStatus='error';
				})	
			},
			search(val){
				this.keyword = val ;
				this.getList()
			}
		}
	}
</script>