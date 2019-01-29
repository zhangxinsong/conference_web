<template>
	<div class="vsm-search-input">
		<input 
			type="text" 
			:placeholder="placeholder" 
			:value="value"
			@keydown.enter="searchIt"/>
	</div>
</template>
<script type="text/javascript">
	
	export default{
		props:{
			placeholder:{
				default:'请输入内容进行搜索'
			},
			value:{
				default:''
			}
		},

		methods:{
			searchIt(e){
				var val = e.target.value ;
				this.$emit('search' , val);
			}
		}
	}
</script>
