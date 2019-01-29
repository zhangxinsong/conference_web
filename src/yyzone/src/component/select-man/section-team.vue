<template>
	<section class="section-team">
		<div class="search-part">
			<search-input @search="search" :value="keyword"/>
		</div>
		<div class="search-content">

			<!-- 人员 -->
			<vsm-each-team 
				v-for="(item,index) in vsm.save.teamList"
				:key="item.gid"
				:data="item" 
				@click.native="vsm.chooseItem( 'team' , item )"/>

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
				this.vsm.ajax_team( this.keyword ,(arr)=>{
					arr.length>0?this.loadingStatus='success':this.loadingStatus='nodata';
					// 赋值
					this.vsm.save.teamList = arr ;
					// 设置默认选中
					this.vsm.map_all_set_default('team');
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
