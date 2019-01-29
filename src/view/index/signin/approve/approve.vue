<template>
    <Tabs :animated="false" class="tabs-wrap">
        <TabPane :label="lang.pending_approval">
        	<approve-pending :id="id"></approve-pending>
        </TabPane>
        <TabPane :label="lang.approved">
        	<approve-resolve :id="id"></approve-resolve>
        </TabPane>
    </Tabs>
</template>
<script>
	export default {
	   components: {
	        'approve-pending': ()=> import('./approve-pending'),
	        'approve-resolve': ()=> import('./approve-resolve')
		},
		props:{
            id: String
        }
	}
</script>

<style lang="less">
	.tabs-wrap{
		.ivu-tabs-nav-container{
			padding: 0 23px;
			height: 50px;
			line-height: 35px;
			background-color: #f5f5f5;
		}
		.ivu-tabs-bar{
			margin-bottom: 0;
		}
		.ivu-tabs-nav .ivu-tabs-tab:hover,.ivu-tabs-nav .ivu-tabs-tab:active{
			color: #E14C46;
		}
		.ivu-tabs-ink-bar{
			height: 3px;
			transform: scaleX(0.25) translate(150%,-4px)!important;
			border-radius: 3px;
		}
	}
	
</style>
