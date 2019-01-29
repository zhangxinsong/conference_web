<template>
	<div class="vsm-body">
		<div class="part1">
			<p>{{vsm.info.title}}</p>
			<div class="r cp">
				<span class="vsm-cross" @click="vsm.close"></span>
			</div>
		</div>
		<div class="part2">
			<div class="col-left" 
				:style="{ paddingTop: Object.keys(headObj).length>1 ?'40px':'0px' }">
				<ul class="col-left-head"
					v-if="Object.keys(headObj).length>1">
					<li v-for="(v,k) in headObj" :key="k"
						:class="{active: headActive==k }" class="cp"  
						:style="{width: Math.floor(100/Object.keys(headObj).length)+'%' }"
						@click="changeTab(v,k)">{{v.str}}</li>		
				</ul>
				<div class="col-left-content">
					<!-- 组件 -->
					<section-dep-man v-if="headObj['depMan'] && headObj['depMan']['ismount']" v-show="headActive=='depMan'"/>
					<section-dep v-if="headObj['dep'] && headObj['dep']['ismount']" v-show="headActive=='dep'"/>
					<section-team v-if="headObj['team'] && headObj['team']['ismount']" v-show="headActive=='team'"/>
					<section-man v-if="headObj['man'] && headObj['man']['ismount']" v-show="headActive=='man'"/>
				</div>
			</div>
			<div class="col-right">
				<div class="col-right-head">
					<p>已选中</p>
					<div class="cp" @click="vsm.clearAll">清空</div>
				</div>
				<div class="col-right-content">
					<section v-for="(v,k) in rightChooseObj">
						<div class="tit cp" @click="clickChooseTie(v,k)">
							{{v.str}}
							<h2 v-show="v.open"></h2>
							<h1 v-show="!v.open"></h1>
						</div>
						<ul class="children-wrap" v-show="v.open">
							<template v-if="k=='dep'">
								<right-choose-item v-for="(item , index) in chooseDep" :key="item.deptId" :data="item" :type="k"/>
							</template>
							<template v-if="k=='team'">
								<right-choose-item v-for="(item , index) in chooseTeam" :key="item.gid" :data="item" :type="k"/>
							</template>
							<template v-if="k=='man'">
								<right-choose-item v-for="(item , index) in chooseMan"  :key="item.memberId" :data="item" :type="k"/>
							</template>
						</ul>
					</section>
				</div>
			</div>
		</div>
		<div class="part3">
			<div class="btn cancel cp" @click="vsm.close">取消</div>
			<div class="btn submit cp" @click="vsm.submit">确定</div>
		</div>
	</div>
</template>
<script type="text/javascript">

	const GET_DEFAULT_HEAD_OBJ = ()=>{
		return {
			depMan:{
				str:'部门',
				ismount:false
			},
			dep:{
				str:'部门',
				ismount:false
			},
			team:{
				str:'内部群',
				ismount:false
			},
			man:{
				str:'人员',
				ismount:false
			}
		}
	}

	import sectionDepMan from './section-dep-man';
	import sectionDep    from './section-dep';
	import sectionTeam   from './section-team';
	import sectionMan    from './section-man';
	import rightChooseItem from './right-choose-item';
	export default{
		// 接受注入的祖先vsm ;
		inject:['vsm'],

		components:{
			sectionDepMan,
			sectionDep,
			sectionTeam,
			sectionMan,
			rightChooseItem
		},

		data(){
			let headObj = GET_DEFAULT_HEAD_OBJ() ;
			let info = this.vsm.info ;
			let headActive = '';
			for(let k in headObj){
				if( info[k]&&info[k].show ){
					if( !headActive ){
						headActive=k ;
						headObj[k].ismount=true ;
					}
				}else{
					delete headObj[k]
				}
			};

			let rightChooseObj={
				'dep': { str:'内部群', open:true },
				'team':{ str:'团队', open:true },
				'man': { str:'人员', open:true }
			};
			!headObj['dep'] ? delete rightChooseObj['dep'] : null ;
			!headObj['team'] ? delete rightChooseObj['team'] : null ;
			!headObj['depMan']&&!headObj['man'] ? delete rightChooseObj['man'] : null ;

			return {
				headObj:headObj,
				headActive:headActive,
				rightChooseObj:rightChooseObj
			}
		},
		computed:{
			chooseDep(){
				let info = this.vsm.info ;
				return info.dep.selected ;
			},
			chooseTeam(){
				let info = this.vsm.info ;
				return info.team.selected ;
			},
			chooseMan(){
				let info = this.vsm.info ;
				return info.depMan.selected.concat( info.man.selected ) ;
			},
		},

		mounted(){

		},	

		methods:{
			changeTab(v,k){
				!this.headObj[k].ismount ? this.headObj[k].ismount=true : null ;
				this.headActive=k ;
			},
			clickChooseTie(v,k){
				v.open=!v.open ;
			}
		}
	}
</script>
