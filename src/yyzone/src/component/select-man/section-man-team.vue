<template>
	<section class="section-man-team">
		<div class="search-part">
			<search-input @search="search" :value="keyword"/>
		</div>
		<div class="search-content">

			<!-- 团队 -->
			<vsm-each-team 
				v-for="(item,index) in vsm.save.man.list_team"
				:key="item.gid"
				:data="item" 
				:type="'man'"/>

			<loading-status :loadingStatus="loadingStatus" @loadAgain="getList"/>
		</div>
	</section>
</template>
<script type="text/javascript">
	
	import searchInput from './vsm-search-input';
	import loadingStatus from './vsm-loading-status';	
	import vsmEachTeam from './vsm-each-team';

	export default{
		// 接受注入的祖先vsm ;
		inject:['vsm'],

		components:{
			searchInput,
			loadingStatus,
			vsmEachTeam
		},

		data(){
			return {
				keyword:'',
				loadingStatus:'loading'
			}
		},

		created(){
			this.getList();
		},

		methods:{
			getList(){
				this.loadingStatus='loading';
				this.vsm.ajax_man_team( this.keyword ,(arr)=>{
					arr.length>0?this.loadingStatus='success':this.loadingStatus='nodata';
					// 赋值
					this.vsm.save.man.list_team = arr ;
					// 设置默认选中
					// this.vsm.map_all_set_default('man');
				},(e)=>{
					this.loadingStatus='error';
				})	
			},
			search(val){
				this.keyword = val ;
				this.getList();
			}
		}
	}
</script>
