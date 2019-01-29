<template>
	<!-- 加载成功不显示 -->
	<div class="vsm-loading-status" v-if="loadingStatus!='success'">
		<!-- 加载中 -->
		<div class="_loading rot" v-if="loadingStatus=='loading'"><span class="vsm-spinner2"></span></div>
		<!-- 暂无数据 -->
		<div class="_nodata" v-if="loadingStatus=='nodata'">暂无数据</div>
		<!-- 加载失败 重新加载 -->
		<div class="_error" v-if="loadingStatus=='error'">加载失败 , <span @click="loadAgain">重新加载</span> </div>
	</div>
</template>
<script type="text/javascript">
	
	export default{
		props:['loadingStatus'], // success , loading , nodata , error
		methods:{
			loadAgain(){
				this.$emit('loadAgain')
			}
		}
	}

</script>
