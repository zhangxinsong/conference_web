<template>
	<div class="sm-search-inp-wrap">
		<Input class="search-inp" v-model="kw" placeholder="请输入姓名进行搜索" @on-change="change"/>
	</div>		
</template>
<script type="text/javascript">
	
	export default{
		data(){
			return {
				kw:'',
				timer:null,
			}
		},
		methods:{
			change(){
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					this.$emit( 'change',this.kw );
				},300)
			}
		}
	}
</script>
<style lang="less">
	.sm-search-inp-wrap{
		position: absolute;
		top: 0;left: 20px;right: 21px;
		height: 47px;
		.search-inp{
			position: absolute;bottom: 0;
		}
	}
</style>