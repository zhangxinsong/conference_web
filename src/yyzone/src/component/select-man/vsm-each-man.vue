<template>
	<div class="vsm-each-man cp">
		<vsm-avatar class="ava" :avatar="data.avatar" :name="data.userName" :type="'man'"/>
		<p class="p1 elli">{{data.userName}}</p>
		<p class="p2 elli">{{data.deptName||'暂无部门名称'}}</p>
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
