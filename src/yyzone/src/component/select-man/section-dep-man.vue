<template>
	<section class="section-dep-man">

		<vsm-dep-tree-item 
			v-for="(item,k) in vsm.save.depManList"
			:key="k"
			:type="'depMan'"
			:data="item"/>

		<loading-status :loadingStatus="loadingStatus" @loadAgain="getList"/>

	</section>
</template>
<script type="text/javascript">
	
	import loadingStatus from './vsm-loading-status';	
	import vsmDepTreeItem from './vsm-dep-tree-item';

	export default{
		// 接受注入的祖先vsm ;
		inject:['vsm'],

		components:{
			loadingStatus ,
			vsmDepTreeItem 
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
				this.vsm.ajax_depMan(0,(arr)=>{
					arr.length>0?this.loadingStatus='success':this.loadingStatus='nodata';
					// 赋值
					this.vsm.save.depManList = arr ;
					// 设置默认选中
					this.vsm.map_all_set_default('man');
				},(e)=>{
					this.loadingStatus='error';
				})	
			}
		}
	}
</script>
