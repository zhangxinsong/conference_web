<template>

	<div class="vsm">
		
		<div class="vsm-mask" v-if="openIt"></div>

		<main-body v-if="openIt"></main-body>

	</div>

</template>
<script type="text/javascript">

	import mainBody from './main-body.vue';

	import ajax from '../../utils/ajax.js';

	let token = '';

	// 选人默认信息
	const GET_DEFAULT_INFO=()=>{
		return {
			// qzId
			qzId: '',
			// memberId
			memberId:'',//获取和自己相关的内部群 需要传memberId ;
			// 标题
	        title: '选择可见范围' , 
	        // 选中后回调
	        callback: function(res){
	        	console.log(res)
	        },
	        // 根据部门选人
	        depMan:{
	        	show:true, //是否显示
	        	selected:[], //已选中回显
	        	limit:100, //选择上限
	        	limitCallback:function(){alert('超出选择上限')}, //达到上限回调
	        },
	        // 选部门---可搜索
	        dep:{
	        	show:true, //是否显示
	        	selected:[], //已选中回显
	        	limit:100, //选择上限
	        	limitCallback:function(){alert('超出选择上限')}, //达到上限回调
	        },
	        // 选团队---可搜索
	        team:{
	        	abortMe:0, //是否为和自己相关的内部群
	        	show:true, //是否显示
	        	selected:[], //已选中回显
	        	limit:100, //选择上限
	        	limitCallback:function(){alert('超出选择上限')}, //达到上限回调
	        },
	        // 选人---可搜索
	        man:{
	        	show:true, //是否显示
	        	selected:[], //已选中回显
	        	limit:100, //选择上限
	        	limitCallback:function(){alert('超出选择上限')}, //达到上限回调
	        }
		}
	};

	// 深度合并 ;
	const DEEP_MERGE=( def , data )=>{
		for(let k in def){
			if( (Object.prototype.toString.call( def[k] ).slice(8, -1)).toLowerCase()=='object' ){// 纯对象
				data[k] ? DEEP_MERGE( def[k] , data[k] ) : data[k]=def[k] ;
			}else{ //不是对象直接赋值
				data[k]==undefined ? data[k]=def[k] : null ;
			}
		}

		return data
	};

	// 储存的ajax递归数据 ;
	const GET_SAVE=()=>{
		return {
			depManList:[],
			depList:[],
			teamList:[],
			manList:[]
		}
	};


	export default{
		// 向所有子组件注入自身 , 省去eventbus ;
		provide(){
			return {
				vsm: this
			}
		},

		components:{
			mainBody
		},
		data(){
			return {
				// 是否打开
				openIt:false,
				// 选人信息 ;
				info: GET_DEFAULT_INFO(),
				// 储存ajax信息
				save: GET_SAVE()
			}
		},
		computed:{
			// ajax配置 
			ajaxConfig(){
				let host = ''
				if( __ENV__ === 'development') {
					 host = `http://123.103.9.204:6058`;
					 console.log(__ENV__, 1)
				} else {
					host = location.protocol + '//' + location.host
					console.log(__ENV__, 2)
				}

				let path = `${host}/conference/rest/v1/candidate/${this.info.qzId}` ;
				return {
					get_dep_url:(deptId)=>{
						return `${path}/${deptId}/depts?token=${token}`;
					},
					get_team_url:()=>{
						return this.info.memberId ? `${path}/${this.info.memberId}/groups?token=${token}` : `${path}/groups?token=${token}`;
					},
					get_man_url:()=>{
						return `${path}/members?token=${token}`
					}
				}
			}
		},

		mounted(){
			token = 'sadasdas';
		},

		methods:{
			open( info ){
				// 重置储存信息 ;
				this.save = GET_SAVE();
				// 重置配置信息 ;
				this.info = DEEP_MERGE( GET_DEFAULT_INFO() , info );
				console.log(this.info)
				// 打开
				this.openIt=true ;
			},
			close(){
				this.openIt=false ;
			},
			// 请求部门和部门下人员
			ajax_depMan( deptId=0 , yes , no ){
				let url = this.ajaxConfig.get_dep_url(deptId);
				ajax({
					url ,
					params:{
						lang:'zh',
						withMembers:1,
						page:1,
						size:9999
					},
					success( arr ){ 
						try{
							arr=JSON.parse(arr);
							arr.map(v=>{
								v.children=[];
								v.checked=false;
							});
							yes&&yes( arr ) 
						}catch(e){
							no&&no();
						}
					},
					error( e ){ 
						no&&no(e) 
					}
				})
			},
			// 请求部门
			ajax_dep( deptId=0 , keyword='' , yes , no ){
				let url = this.ajaxConfig.get_dep_url(deptId);
				ajax({
					url ,
					params:{
						lang:'zh',
						withMembers:0,
						keyword ,
						page:1,
						size:9999
					},
					success(arr){
						try{
							arr=JSON.parse(arr);
							arr.map(v=>{
								v.children=[];
								v.checked=false;
							});
							yes&&yes( arr ) 
						}catch(e){
							no&&no();
						}
					},
					error(e){
						no&&no(e) 
					}
				})
			},
			// 请求团队
			ajax_team( keyword='' , yes , no ){
				let url = this.ajaxConfig.get_team_url();
				ajax({
					url ,
					params:{
						lang:'zh',
						keyword,
						page:1,
						size:300
					},
					success(arr){
						try{
							arr=JSON.parse(arr);
							arr.map(v=>{
								v.checked=false;
							});
							yes&&yes( arr ) 
						}catch(e){
							no&&no();
						}
					},
					error(e){
						no&&no(e) 
					}
				})
			},
			// 请求人员
			ajax_man( keyword='' , yes , no ){
				let url = this.ajaxConfig.get_man_url();
				ajax({
					url ,
					params:{
						lang:'zh',
						keyword ,
						page:1,
						size:300
					},
					success(arr){
						try{
							arr=JSON.parse(arr);
							arr.map(v=>{
								v.checked=false;
							});
							yes&&yes( arr ) 
						}catch(e){
							no&&no();
						}
					},
					error(e){
						no&&no(e) 
					}
				})
			},

			// 设置选中项
			map_all_set_default( type ){
				if( type=='dep' ){
					let deps = this.info['dep'].selected ;
					// 递归查找部门
					var RENDER = function( arr ){
						for(let i=0 ; i<arr.length ; i++){
							let each = arr[i];
							each.checked = false ;
							deps.map(v=>{
								v.deptId==each.deptId ? each.checked=true : null ;
							});

							RENDER( each.children||[] )
						}
					}
					RENDER(this.save.depList)
				}
				if( type=='team' ){
					let teams = this.info['team'].selected ;
					for(let i=0 ; i<this.save.teamList.length ; i++){
						let each = this.save.teamList[i];
						each.checked = false ;
						teams.map(v=>{
							v.gid==each.gid ? each.checked=true : null ;
						})
					}
				}
				if( type=='man' || type=='depMan' ){
					// 右侧选中的人员
					let mans = this.info['depMan'].selected.concat( this.info['man'].selected );
					// 递归查找部门下人员
					var RENDER = function( arr ){
						for(let i=0 ; i<arr.length ; i++){
							let each = arr[i];
							if( each.type==1 ){
								RENDER( each.children||[] );
							}else{
								each.checked = false ;

								mans.map(v=>{
									v.memberId==each.memberId ? each.checked=true : null ;
								})
							}
						}
					}
					RENDER( this.save.depManList );
					// 查找人员下人员
					for(let i=0 ; i<this.save.manList.length ; i++){
						let each = this.save.manList[i];
						each.checked = false ;
						mans.map(v=>{
							v.memberId==each.memberId ? each.checked=true : null ;
						})
					}
				}
			},

			// 选中事件
			chooseItem( type , v ){
				if( !v.checked ){
					this.rightAdd( type , v );
				}else{
					this.rightDel( type , v );
				}
			},
			// 右侧添加 部门,团队,人员 ;
			rightAdd( type , v ){
				// 打断关联 ;
				v = JSON.parse(JSON.stringify(v));

				let arr ;
				let idType ;
				if(type=='dep'){
					arr = this.info['dep'].selected  ;
					idType='deptId';
				}
				if(type=='team'){
					arr = this.info['team'].selected  ;
					idType='gid';
				}
				if(type=='depMan'||type=='man'){
					arr = this.info['depMan'].selected.concat( this.info['man'].selected );
					idType='memberId';
				}
				let isInArr = false ;
				for(let i=0; i<arr.length; i++){
					if( arr[i][idType]==v[idType] ){
						isInArr=true ;
					}
				}
				// 准备添加
				if( !isInArr ){
					let limit = this.info[type].limit ;
					let limitCallback = this.info[type].limitCallback ;
					if( limit>1 ){// 多选
						if( arr.length>=limit ){
							limitCallback&&limitCallback();
						}else{
							this.info[ type ].selected.push(v);
						}
					}else{// 单选
						this.info[type].selected=[v];
						type=='depMan' ? this.info['man'].selected=[] : null ;
						type=='man' ? this.info['depMan'].selected=[] : null ;
					}
				}
				// 设置选中项
				this.map_all_set_default( type );
			},
			// 右侧删除 部门,团队,人员 ;
			rightDel( type , v ){				
				if(type=='dep'){
					let arr = this.info['dep'].selected  ;
					for(let i=0; i<arr.length; i++){
						if( arr[i]['deptId']==v['deptId'] ){
							arr.splice(i,1);
							i--;
						}
					}
				}
				if(type=='team'){
					let arr = this.info['team'].selected  ;
					for(let i=0; i<arr.length; i++){
						if( arr[i]['gid']==v['gid'] ){
							arr.splice(i,1);
							i--;
						}
					}
				}
				if(type=='depMan'||type=='man'){
					let arr1 = this.info['depMan'].selected ;
					let arr2 = this.info['man'].selected ;
					for(let i=0; i<arr1.length; i++){
						if( arr1[i]['memberId']==v['memberId'] ){
							arr1.splice(i,1);
							i--;
						}
					}
					for(let i=0; i<arr2.length; i++){
						if( arr2[i]['memberId']==v['memberId'] ){
							arr2.splice(i,1);
							i--;
						}
					}
				}
				// 设置选中项
				this.map_all_set_default( type );
			},
			// 清空
			clearAll(){
				this.info['depMan'].selected=[];
				this.info['dep'].selected=[];
				this.info['team'].selected=[];
				this.info['man'].selected=[];
				// 设置选中项
				this.map_all_set_default( 'dep' );
				this.map_all_set_default( 'team' );
				this.map_all_set_default( 'man' );
			},

			// 提交
			submit(){
				this.info.callback( JSON.stringify(this.info) );
				this.close();
			},
		}
	}
</script>
