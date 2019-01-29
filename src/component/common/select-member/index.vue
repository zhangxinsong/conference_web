<template>
    <Modal v-model="openModel" class="select-member-component" width="600px">
        <div slot="header" class="select-member-header">
            {{info.title}}
        </div>
        <div class="select-member-content">
            <div class="left-part-wrap">
            	<left-select-part  v-if="openModel" :info="info" :ROOT="this"/>
            </div>
            <div class="right-part-wrap">
            	<right-select-part v-if="openModel" :info="info" :ROOT="this"/>
            </div>
        </div>
        <div slot="footer" class="select-member-footer">
        	<p class="l maxCount" v-show=" info.maxCount>1 ">
        		每次选择不可超过{{info.maxCount}}人，请分批选择
        	</p>
            <Button class="btn" type="ghost" @click="cancel">取消</Button>
            <Button class="btn success" type="success" @click="submit">确定</Button>
        </div>
    </Modal>
</template>
<script type="text/javascript">
	
	import './icon/style.css';

	import leftSelectPart  from './left-select-part'; 
	import rightSelectPart from './right-select-part';


	// 默认选人信息 ;
    const DEFAULT_INFO = function(){
        return {
			title:'选人',
			maxCount:3000,
			// 显示状态
			dep:false, team:false, man:false ,
			// 已选中项
			selected: {
				dep: [],
				team:[],
				man: []
			}
        }
    };

	export default{
		components:{
			leftSelectPart ,
			rightSelectPart
		},

		data(){
			return {
				// 是否打开浮层
				openModel:false ,

				// 选人信息
				info: DEFAULT_INFO() ,

				// 储存所有请求数据 ;
				saveAjaxDep:[],
				saveAjaxTeam:[],
				saveAjaxMan:[],
			}
		},
		computed:{
			allowCheck(){
                let all = this.info.selected.dep.length + this.info.selected.team.length + this.info.selected.man.length ;
                // console.log(all , this.info.maxCount)
                let max = this.info.maxCount ;
                if( all>=max ){
                    return false ;
                }else {
                    return true ;
                }
            }
		},
		watch:{
			// 监听关闭
			openModel( bool ){
				!bool ? this.resetInfo() : null ;
			},
			// 监听左侧
			saveAjaxDep(){
				this.setDefaultTrue('dep')
			},
			saveAjaxTeam(){
				this.setDefaultTrue('team')
			},
			saveAjaxMan(){
				this.setDefaultTrue('man')
			},
			// 监听右侧
			'info.selected.dep'(){
				this.setDefaultTrue('dep')
			},
			'info.selected.team'(){
				this.setDefaultTrue('team')
			},
			'info.selected.man'(){
				this.setDefaultTrue('man')
			},
		},

		methods:{
			//关闭
			cancel(){
				this.openModel = false ;
			},
			// 打开 --> 设置数据 ;
			open( params ){
				// *** 在这一步 打断关联 !!!! ;
				params = JSON.parse(JSON.stringify( params ));
				let info = {
					...this.info ,
					...params
				};
                !info.selected.dep  ? info.selected.dep =[]  : null ;
                !info.selected.team ? info.selected.team=[]  : null ;
                !info.selected.man  ? info.selected.man =[]  : null ; 
                this.info = info ;

                this.openModel=true ;
			},
			// 关闭时 , 重置数据 
            resetInfo(){
                this.info = DEFAULT_INFO() ;
                this.saveAjaxDep  = [] ;
                this.saveAjaxTeam = [] ;
                this.saveAjaxMan  = [] ;
            },
			// 确定
			submit(){
				// *** 在这一步 打断关联 !!!! ;
				let selected = JSON.parse(JSON.stringify( this.info.selected ));
				this.$emit('selectMemberCallback',selected);

				this.openModel = false ;
			},
			// 每次选择,删除 找到默认选中项目
			setDefaultTrue( type ){
                let idtype ;// id种类 
                let get  ;  // 右侧得到的数据
                let save ;  // 储存的数据
                if( type=='dep' ){
                    idtype = 'deptId' ;
                    get    = this.info.selected.dep;
                    save   = this.saveAjaxDep;
                };
                if( type=='team' ){
                    idtype = 'gid' ;
                    get    = this.info.selected.team;
                    save   = this.saveAjaxTeam;
                };
                if( type=='man' ){
                    idtype = 'memberId' ;
                    get    = this.info.selected.man;
                    save   = this.saveAjaxMan;
                };
                var getSame=( item )=>{
                    for( let i=0,len=get.length ; i<len ; i++ ){
                    	if( get[i][idtype]==item[idtype] ){
                    		return true ;	
                    	}
                    }
                    return false ;
                };
                save.map( item=>{
                	getSame(item) ? item.checked=true : item.checked=false ;
                })
			},
            // 右侧,增加一个
            right_add( type , item ){
                let arr = this.info.selected[type] ;
                    arr.push(item);   
            },
            // 右侧,删除一个
            right_del( type , item ){
            	let index ;  // 下标
            	let idtype ; // id种类
                if( type=='dep' ){
                    idtype = 'deptId' ;
                };
                if( type=='team' ){
                    idtype = 'gid' ;
                };
                if( type=='man' ){
                    idtype = 'memberId' ;
                };
            	let arr = this.info.selected[type] ;
            		arr.map((v,k)=>{
            			if( v[idtype]==item[idtype] ){
            				index=k  ;
            			}
            		})

            	index!=undefined ? arr.splice(index,1) : null ;
            },
            // 清空 
            clearSelected(){
				this.info.selected = {
					dep: [],
					team:[],
					man: []
				}
            },
            // 是否超出 ;
            checkLimit(){
            	// console.log( this.allowCheck )
                if( this.allowCheck ){
                	return true ;
                }else{
                	this.alert_warning( '超出选择范围' );
                	return false ;
                }
            }
		}
	}

</script>
<style lang="less">
	@import './var.less';
	.select-member-component{
		*{
			box-sizing:border-box;
		}
		li {
			list-style: none;
		}

		.inlb {
			vertical-align: middle;
			display: inline-block;
		}

		.cp {
			cursor: pointer;
		}

		.discp {
			cursor: not-allowed;
		}

		.elli {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.auto {
			display: block;
			width: 20px;
			margin: 0 auto;
		}

		.r {
			float: right;
		}

		.l {
			float: left;
		}

		.show-all-wrap {
			margin-right: 7px;
			display: inline-block;
		}



		.ivu-modal-header {
			background: @white-color;
			font-size: 14px;
		    border-bottom: 1px solid #e9eaec;
		    padding: 14px 16px;
		    line-height: 1;
		}
		.ivu-modal-content {
			overflow: hidden;
		}
		.ivu-modal-body {
			height: 400px;
			padding: 0px;
		}
		.ivu-modal-close{
			top:5px;
		}
		.select-member-content {
			position: relative;
			height: 100%;
			padding-right: 240px;
			.left-part-wrap {
				position: relative;
				height: 100%;
				width: 100%;
			}
			.right-part-wrap {
				height: 100%;
				position: absolute;
				top: 0;
				right: 0;
				width: 240px;
				border-left: 1px solid @border-color;
			}
			.left-part>section,
			.right-part>section {
				width: 100%;
				height: 100%;
			}
		}
		.select-member-footer{
			font-size:12px;
		}
		.btn {
			width: 90px;
		}
		.success {
			background: @primary-color;
			border: 1px solid @primary-color;
		}
		.maxCount {
			font-size: 12px;
			line-height: 26px;
			color: @error-color;
		}
	}
</style>