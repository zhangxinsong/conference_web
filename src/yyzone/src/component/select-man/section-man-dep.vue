<template>
	<section class="section-man-dep">

		<vsm-each-dep-tree 
			v-for="(item,k) in vsm.save.man.list_dep"
			:key="k"
			:type="'man'"
			:data="item"/>

		<loading-status :loadingStatus="loadingStatus" @loadAgain="getList"/>

	</section>
</template>
<script type="text/javascript">
	
	import loadingStatus from './vsm-loading-status';	
	import vsmEachDepTree from './vsm-each-dep-tree';

	export default{
		// 接受注入的祖先vsm ;
		inject:['vsm'],

		components:{
			loadingStatus ,
			vsmEachDepTree 
		},

		data(){
			return {
				loadingStatus:'loading'
			}
		},

		created(){
			this.getList()
		},

		methods:{
			getList(){
				this.loadingStatus='loading';
				this.vsm.ajax_man_dep(0,(arr)=>{
					arr.length>0?this.loadingStatus='success':this.loadingStatus='nodata';
					// 赋值
					this.vsm.save.man.list_dep = arr ;
					// 设置默认选中
					this.vsm.map_all_set_default('man');
				},(e)=>{
					this.loadingStatus='error';
				})	
			}
		}
	}
</script>