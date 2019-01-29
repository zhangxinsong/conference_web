<template>
	<div class="right-choose-item">
		<vsm-avatar class="ava" :avatar="data.avatar" :name="data.userName" :type="type"/>
		<p class="elli" v-if="type=='dep'">{{data.deptName}}</p>
		<p class="elli" v-if="type=='team'">{{data.groupName}}</p>
		<p class="elli" v-if="type=='man'">{{data.userName}}</p>
		<div class="r cp" @click="vsm.rightDel(type , data)">
			<span class="vsm-cross"></span>
		</div>
	</div>
</template>
<script type="text/javascript">

	import vsmAvatar from './vsm-avatar';

	export default{
		// 接受注入的祖先vsm ;
		inject:['vsm'],

		props:{
			type:{
				required:true
			},
			data:{
				required:true
			}
		},

		components:{
			vsmAvatar
		},

		data(){
			return {

			}
		},
		methods:{

		}
	}
</script>
