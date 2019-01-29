<template>
    <fs-content-layout class="app-manage">
        <template slot="title">
            <span>{{lang.apps}}</span>
        </template>
        <template slot="content">
        	<div class="manage-main">
        		<ul class="manage-list" v-if="data && data.apps">
	        		<li v-for="(item,index) in data.apps" :key="index">
	        			<div class="app-logo">
							<img :src="item.icon" :class="{'gray': !item.enable}" @error="item.icon=''" style="width: 100%;"/>
						</div>
	        			<p class="app-name">{{item.name}}</p>
	        			<span class="haddle">
	        				<span class="switch-btn" :class="['switch-btn',{'off': !item.enable}]" @click="switchStatus(item)">{{item.enable? lang.close:lang.enable}}</span>
	        			</span>
	        		</li>
	        	</ul>
        	</div>
        </template>
    </fs-content-layout>
</template>

<script>
import config from '../../../config/index.js';
import * as applicationActions from 'app_src/actions/application';

export default {
    data () {
        return {
			data: null
        }
    },
    props: ['id'],
    components: {
        'fs-content-layout': ()=> import('app_component/index/common/contentLayout')
    },
    methods:{
		getList(){
			applicationActions.getList({
				conferenceId: this.id,
				success: res=>{
					this.data = res;
				},
				error: res=>{
				},
			});
		},
		switchStatus(data){
			if(data){
				applicationActions.update({
					conferenceId: this.id,
					appId: data.appId,	
					enable: !data.enable,
					memberId: this.$store.state.memberId,
					success: res=>{
						// data.enable = !data.enable;
						this.$set(data, 'enable', !data.enable)
					},
					error: res=>{

					},
				});
			}
		}
	},
	created () {
		this.getList();
	}
}
</script>
<style lang="less" scoped>
	.app-manage{
		.manage-main{
			padding: 40px;
		}
		.manage-list{
			li{
				width: 120px;
				height: 140px;
				overflow: hidden;
				position: relative;
				float: left;
				.haddle{
					display: none;
				}

				&:hover{
					box-shadow:0px 0px 20px 0px rgba(0,0,0,0.1);
					.haddle{
						display: block;
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background-color: rgba(255,255,255, .9);
						.switch-btn{
							cursor: pointer;
							position: absolute;
							display: block;
							top: 50%;
							left: 50%;
							margin-top: -15px;
							margin-left: -40px;
							width: 80px;
							height: 30px;
							line-height: 30px;
							text-align: center;
							border: 1px solid #E14C46;
							border-radius: 3px;
							color: #E14C46;
							&.off{
								background-color: #E14C46;
								color: #fff;
							}
						}
					}
				}
			}
			.app-logo{
				margin: 20px auto 10px;
				width: 60px;
				height: 60px;
				// border: 1px dashed #474D54;
				img {
					&.gray { 
						-webkit-filter: grayscale(100%);
						-moz-filter: grayscale(100%);
						-ms-filter: grayscale(100%);
						-o-filter: grayscale(100%);
						
						filter: grayscale(100%);
						
						filter: gray;
					}
				}
			}
			.app-name{
				color: #474D54;
				font-size: 14px;
				text-align: center;
			}
		}
	}
</style>
