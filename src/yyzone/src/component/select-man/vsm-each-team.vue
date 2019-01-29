<template>
	<div class="vsm-each-team cp">
		<vsm-avatar class="ava" :avatar="data.avatar" :name="data.userName" :type="'team'"/>
		<p class="p1 elli">{{data.groupName}}</p>
		<vsm-check-box class="cbx" :checked="data.checked"/>
	</div>
</template>
<script type="text/javascript">
	
	import vsmAvatar from './vsm-avatar';
	import vsmCheckBox from './vsm-check-box';

	export default{
		// 接受注入的祖先vsm ;
		inject:['vsm'],
		
		props:{
			data:{
				required:true
			}
		},

		components:{
			vsmAvatar,
			vsmCheckBox
		},

		methods:{

		}
	}
</script>
