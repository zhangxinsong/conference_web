<template>

	<div class="vsm-check-box" 
		:class="{
			checked: checked ,
			disabled: disabled
		}">
		<span class="vsm-checkbox-checked"></span>
	</div>

</template>
<script type="text/javascript">
	
	export default{
		props:{
			checked:{
				default:false
			},
			disabled:{
				default:false
			}
		},
		components:{

		},

		data(){
			return {

			}
		},
		methods:{

		}
	}
</script>
