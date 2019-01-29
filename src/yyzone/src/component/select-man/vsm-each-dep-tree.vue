<template>
	<div class="vsm-dep-tree" v-if="data">

		<!-- 根据部门选人 -->
		<template v-if="type=='man'">

			<!-- 部门 -->
			<template v-if=" data.type==1 ">
				<div style="padding:5px 0" class="dep-wrap">
					<!-- 标题 -->
					<div class="vsm-dep-tree-title">
						<div class="rot-wrap cp" v-if="data.haveSub" @click.stop="openChildFun">
							<div class="close vsm-play3" :class="{open: openChild }"></div>
						</div>
						<p class="elli">{{data.deptName}}</p>
					</div>
					<!-- 儿子容器 -->
					<div class="vsm-dep-tree-childrenWrap" v-if="openChild && data.children">

						<vsm-each-dep-tree 
							v-for="(item,index) in data.children"
							:key="index"
							:type="'man'"
							:data="item"/>

						<loading-status :loadingStatus="loadingStatus" @loadAgain="getList"/>
					</div>
				</div>
			</template>

			<!-- 人员 -->
			<template v-if=" data.type==0 ">
				<vsm-each-man 
					:data="data" 
					@click.stop.native="vsm.chooseItem( 'man' , data )"/>
			</template>

		</template>

		<!-- 只选部门 -->
		<template  v-if="type=='dep'">

			<!-- 部门 -->
			<div style="padding:5px 0" class="dep-wrap">
				<!-- 标题 -->
				<div 
					class="vsm-dep-tree-title" 
					@click="vsm.chooseItem( 'dep' , data )">
					<div class="rot-wrap cp" v-if="data.haveSub" @click.stop="openChildFun">
						<div class="close vsm-play3" :class="{open: openChild }"></div>
					</div>
					<p class="elli">{{data.deptName}}</p>
					<check-box class="check-box" :checked="data.checked"/>
				</div>
				<!-- 儿子容器 -->
				<div class="vsm-dep-tree-childrenWrap" v-if="openChild && data.children">
					<vsm-each-dep-tree 
						v-for="(item,index) in data.children"
						:key="item.deptId"
						:type="'dep'"
						:data="item"/>

					<loading-status :loadingStatus="loadingStatus" @loadAgain="getList"/>
				</div>
			</div>

		</template>
	</div>
</template>
<script type="text/javascript">

	import loadingStatus from './vsm-loading-status';	
	import vsmEachMan from './vsm-each-man';
	import checkBox from './vsm-check-box';

	export default{
		// 接受注入的祖先vsm ;
		inject:['vsm'],

		name:'VsmEachDepTree',

		props:{
			data:{
				required:true
			},
			type:{
				required:true //man , dep
			}
		},

		components:{
			checkBox ,
			loadingStatus ,
			vsmEachMan
		},

		data(){
			return {
				openChild:false ,
				loadingStatus:''
			}	
		},
		methods:{
			openChildFun(){
				this.openChild = !this.openChild ;
				if( this.openChild ){
					this.getList();
				}else{
					this.data.children=[];
				}
			},
			getList(){
				if( this.type=='man' ){
					this.loadingStatus='loading';
					this.vsm.ajax_man_dep( this.data.deptId ,(arr)=>{
						arr.length>0?this.loadingStatus='success':this.loadingStatus='nodata';
						// 赋值
						this.data.children = arr ;
						// 设置默认选中
						this.vsm.map_all_set_default('man');
					},(e)=>{
						this.loadingStatus='error';
					})
				};
				if( this.type=='dep' ){
					this.loadingStatus='loading';
					this.vsm.ajax_dep( this.data.deptId , '' ,(arr)=>{
						arr.length>0?this.loadingStatus='success':this.loadingStatus='nodata';
						// 赋值
						this.data.children = arr ;
						// 设置默认选中
						this.vsm.map_all_set_default('dep');
					},(e)=>{
						this.loadingStatus='error';
					})
				};
			}
		}
	}
</script>
