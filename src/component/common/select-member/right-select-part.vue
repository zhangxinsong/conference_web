<template>
	<div class="right-select-part">
		<div class="title">
			<span class="l">已选择
				<span v-show="all">{{all}}</span>
			</span>
			<span class="r cp" @click="clearAll">清空</span>
		</div>
		<div class="sm_scroll scroll">
			<!-- 组织 -->	
			<div class="tit cp" @click="openDep=!openDep" v-show="info.dep">
				组织
				<Icon type="chevron-up" class="r" v-show="openDep"></Icon>
				<Icon type="chevron-down" class="r" v-show="!openDep"></Icon>
			</div>
			<ul v-show="openDep && info.dep">
				<li class="li" v-for="each in depList">
					<div class="head-wrap l">
						<avatar :name="each.deptName" type="dept" :size="'28px'"/>
					</div>
					<div class="depName elli l">
						{{each.deptName}}
					</div>
					<div class="r" @click="removeSelected('dep',each)">
						<Icon type="close-round" class="close cp"></Icon>
					</div>
				</li>	
			</ul>
			<!-- 内部群 -->	
			<div class="tit cp" @click="openTeam=!openTeam" v-show="info.team">
				内部群
				<Icon type="chevron-up" class="r" v-show="openTeam"></Icon>
				<Icon type="chevron-down" class="r" v-show="!openTeam"></Icon>
			</div>
			<ul v-show="openTeam && info.team">
				<li class="li" v-for="each in teamList">
					<div class="head-wrap l">
						<avatar :avatar="each.groupLogo"  type="group" :name="each.groupName" :size="'28px'"/>
					</div>
					<div class="groupName elli l">
						{{each.groupName}}
					</div>
					<div class="r" @click="removeSelected('team',each)">
						<Icon type="close-round" class="close cp"></Icon>
					</div>
				</li>			
			</ul>
			<!-- 成员 -->		
			<div class="tit cp" @click="openMan=!openMan" v-show="info.man">
				成员
				<Icon type="chevron-up" class="r" v-show="openMan"></Icon>
				<Icon type="chevron-down" class="r" v-show="!openMan"></Icon>
			</div>
			<ul v-show="openMan && info.man">
				<li class="li" v-for="each in manList">
					<div class="head-wrap elli l">
						<avatar :avatar="each.avatar" :name="each.name || each.userName" fontSize="12px" :size="'28px'"/>
					</div>
					<div class="userName l">
						{{each.name || each.userName}}
					</div>
					<div class="r" @click="removeSelected('man',each)">
						<Icon type="close-round" class="close cp"></Icon>
					</div>				
				</li>			
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">

	import avatar from './avatar';

	export default{
		props:["info","ROOT"],
		components:{
			avatar
		},

		computed:{
			depList(){
				return this.info.selected.dep ;
			},
			teamList(){
				return this.info.selected.team ;
			},
			manList(){
				return this.info.selected.man ;
			},	
			all(){
				return this.depList.length + this.teamList.length + this.manList.length ;
			}		
		},
		updated(){

		},

		mounted(){
			
		},

		data(){
			return {
				openDep :true,
				openTeam:true,
				openMan :true
			}
		},
		methods:{
			removeSelected( type , each ){
				this.ROOT.right_del( type , each );
			},
			clearAll(){
				this.ROOT.clearSelected();
			}
		}
	}
</script>
<style lang="less" scoped>
@import './var.less';
.right-select-part {
	height: 100%;
	width: 100%;
	position: relative;
	font-size:12px;
	.title {
		height: 40px;
		line-height: 40px;
		padding: 0 15px;
		box-sizing: border-box;
		// border-bottom: 1px solid @border-color;
		.r {
			color: @error-color
		}
	}
	.tit {
		height: 27px;
		line-height: 27px;
		padding: 0 15px;
		box-sizing: border-box;
		border-top: 1px solid @border-color;
		background: @white-color-light;
		.r {
			font-size: 12px;
			color: @gray-color-light;
			opacity: .8;
			position: relative;
			top: 7px;
		}
	}
	.scroll {
		position: absolute;
		left: 0;
		right: 0;
		top: 40px;
		bottom: 0;
		overflow: auto;
	}
	.avatar-wrapper .name {
		font-size: 12px;
	}
	.head-wrap {
		width: 28px;
		height: 28px; 
		// background: #f0f0f0;
		// border-radius: 50%;
		font-size: 0;
	}
	.li {
		line-height: 28px;
		color: @gray-color-dark;
		overflow: hidden;
		font-size: 13px;
		padding: 7px 16px 7px 15px;
		&:hover .close {
			display: inline-block;
		}
		&:hover {
			background: rgba(126, 231, 192, 0.1);
		}
	}
	.li:nth-of-type(1) {
		padding-top: 13px;
	}
	.close {
		font-size: 12px;
		color: @gray-color-light;
		display: none;
		opacity: .8;
		position: relative;
		top: -1px;
	}
	.depName,
	.groupName,
	.userName {
		margin-left: 8px;
		max-width: 150px;
	}
}
</style>