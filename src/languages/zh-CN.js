/**
 * 中文语言包
 * rongqb@yonyou.com
 * 20180711
 */
export default {
    id: 'zhs',
    // exp: /(?:zh[\-\_]CN|cn)/i,
    exp: /zhs/i,
    name: '简体中文',
    config: {
        'uploadfailed': "图片上传失败",
        'human_faces_via': "(开启后，可在手机APP使用采集人脸照片)",
        'characters': "字",
        'day': "天",
        'week': "周",
        'd': "2D",
        'd_lucky_draw_screen_mirroring': "2D抽奖投屏",
        'd_check_in_screen_mirroring': "2D签到投屏",
        'dd': "3D",
        'd_lucky_draw_screen_mirroring': "2D抽奖投屏",
        'd_check_in_screen_mirroring': "3D签到投屏",
        'd_countdown': "3D倒计时",
        'd_roulette': "3D转盘抽奖",
        'd_roulette_for_over': "3D转盘抽奖（适合50人以上）",
        'include': "包括:",
        'save': "保存",
        'check_in_list': "签到名单",
        'lucky_draw': "幸运抽奖",
        'h5_from_design': "报名h5设计",
        'h5_from_fields': "报名h5字段配置",
        'registration': "报名管理",
        'applicants_and_attendees': "报名和参会人员",
        'start_time_one': "报名开始时间:",
        'end_time': "报名截止时间:",
        'end_time_cannot_start_time': "报名截止时间不能小于开始时间",
        'registration_configuration': "报名配置",
        'applicant': "报名人员",
        'registration_approval': "报名审批",
        'registration_time': "报名时间",
        'background_settings': "背景设置",
        'required': "必填",
        'edit': "编辑",
        'edit_icon': "编辑图标",
        'edit_guide': "编辑指南",
        'title': "标题",
        'title_is_required': "标题不能为空",
        'reject': "驳回",
        'do_not_join_team': "不加入团队",
        'activity_being_opened_cannot_be_deleted': "不可删除正在打开的活动",
        'do_not_push_app_message': "不推送应用消息",
        'not_needed': "不需要",
        'live_broadcasting_not_needed': "不需要直播",
        'attendee': "参会人员",
        'attendee_mgmt': "参会人员管理",
        'attendee_list': "人员列表",
        'operation': "操作",
        'operation_succeeded': "操作成功",
        'operation_failed': "操作失败",
        'query_one': "查询",
        'greetings': "成功欢迎语",
        'member': "成员",
        'lucky_draw_scope': "抽奖范围",
        'lucky_draw': "抽奖管理",
        'lucky_draw_screen_mirroring': "抽奖投屏",
        'created_successfully': "创建成功",
        'create_conference': "创建大会",
        'failed_to_create': "创建失败",
        'create_invitation_code': "创建邀请码",
        'big': '大',
        'conference_cover_picture': "大会封面图",
        'conference_mgmt': "大会管理",
        'conference_ads_picture': "大会广告图",
        'conference_basic_info': "大会基础信息",
        'conference_list': "大会列表",
        'conference': "大会名称",
        'conference_time': "大会时间",
        'conference_applications': "大会应用管理",
        'conference_guideline': "大会指南",
        'conference_subject': "大会主题",
        'pending_approval': "待审批",
        'barrage_speed': "弹幕速度",
        'import_succeeded': "导入成功",
        'import_personnel': "导入人员",
        'import_failed': "导入失败",
        'import_data': "导入数据",
        'export_winner_list': "导出获奖名单",
        'qr_code': "二维码",
        'published_by': "发布人",
        'post': "发布内容",
        'screen_mirroring': "发言投屏",
        'share': "分享",
        'attachment_size_exceeds_limit': "附件大小超出范围",
        'invalid_attachment_format': "附件格式不符合",
        'copy': "复制",
        'sub_title': "副标题",
        'record': '个数据',
        'updated_successfully': "更新成功",
        'check_in_settings_updated_successfully': "更新签到设置成功!",
        'failed_to_update': "更新失败",
        'company': "公司",
        'congratulations_prize': "恭喜您，获得{{conference.name}}大会{{activity.name}}会场，{{prize.prize}}：{{prize.prizeName}}奖品一份，立即联系工作人员领取奖品吧",
        'congratulations': "恭喜您中奖了",
        'close': "关闭",
        'interactive_barrage': "互动弹幕管理",
        'activity_mgmt': "活动管理",
        'activity_title': "活动名称",
        'activity_date': "活动日期",
        'activity_time': "活动时间",
        'winner_list': "获奖名单",
        'obtain_meeting_code': "获取会议号",
        'basic_info': "基础信息",
        'join_team': "加入团队",
        'load_more': "加载更多",
        'failed_to_load': "加载失败",
        'reload': "重新加载",
        'recommended_picture_size': "建议上传图片尺寸1920*1080,大小不超过10M",
        'prize': "奖项",
        'prize_name': "奖项名称",
        'end_time_two': "结束时间",
        'in_progress': "进行中",
        'enable': "开启",
        'enable_face_recognition': "开启人脸识别",
        'enable_face_recognition_to_gather_face_data': "开启人脸识别集颜值",
        'start_lucky_draw': "开始抽奖",
        'start_time': "开始时间",
        'fast': "快",
        'lucky_draw_tip': "快捷键“shfit+enter”控制抽奖的开始与结束，你要注意自己的洪荒之力哦，点击一次即第一次",
        'slow': "慢",
        'select_no_more_than_one': "每次选择不可超过",
        'select_no_more_than_two': "人，请分批选择",
        'internal_group': "内部群",
        'content_is_required': "内容不能为空",
        'confirm_to_delete_the_prize': "你确定删除这个奖品?",
        'confirm_to_delete_the_member': "你确定删除这个成员?",
        'confirm_to_delete_the_activity': "你确定删除这个活动?",
        'confirm_to_delete_the_agenda': "你确定删除这个议程?",
        'confirm_to_delete_the_conference': "你确定删除这个大会?",
        'successfully_imported_tips': "您成功导入参会人员 ",
        'successfully_imported_two': "人。",
        'download_tips': "您可以直接下载Excel模板，按照指定格式编辑导入用户信息，然后导入数据。",
        'failed_tips': "您提供的excel中有",
        'failed_tips_one': "条成功，",
        'failed_tips_two': "条数据不符合导入规则，",
        'failed_tips_three': "我们对这些数据做了黄色标识，请下载修改后重新导入。",
        'failed_tips_four': "请核对上传的表格是否符合约定规范，请按照约定规范重新上传。",
        'batch_reject': "批量驳回",
        'batch_agree': "批量同意",
        'other': "其他",
        'enable_two': "启用",
        'checked_in_successfully': "签到成功，您是第{{record.sequence}}位签到人员！",
        'add_the_checked_in_users_into_the_team': "签到成功加入到团队",
        'send_message_to_the_checked_in_users': "签到成功推送应用消息",
        'check_in_qr_code': "签到二维码",
        'check_in_mgmt': "签到管理",
        'check_in_personnel_range': "签到人员范围",
        'check_in_failed': "签到失败，请联系工作人员帮您签到！",
        'check_in_tips': "签到提示语",
        'check_in_statistics': "签到统计",
        'check_in_screen_mirroring': "签到投屏",
        'clear': "清空",
        'clear_Barrage_data': "清空弹幕数据",
        'check_tip': "请勾选两个及以上人员",
        'please_enter': "请输入",
        'please_enter_conference_name': "请输入大会名称",
        'please_enter_conference_subject': "请输入大会主题",
        'please_enter_company': "请输入公司",
        'please_enter_filtering_keyword': "请输入关键词筛选",
        'please_enter_prize': "请输入奖项",
        'please_enter_prize_name': "请输入奖项名称",
        'please_enter_mobile_number': "请输入手机号",
        'please_enter_search_content': "请输入搜索内容",
        'please_enter_message_content_to_push': "请输入推送消息内容（必填）",
        'please_enter_URL': "请输入网页链接",
        'please_enter_name': "请输入姓名",
        'please_enter_the_name_to_search': "请输入姓名进行搜索",
        'please_enter_invitation_code': "请输入邀请码渠道，1-20个字",
        'please_enter_email': "请输入邮箱",
        'please_enter_live_broadcasting': "请输入直播地址",
        'please_enter_live_broadcasting_subject': "请输入直播主题",
        'please_enter_position': "请输入职位",
        'please_enter_field': "请输入字段",
        'please_first_allow': "请先允许打开浏览器新窗口",
        'please_select': "请选择",
        'please_select_background_picture': "请选择背景图",
        'please_select_start_time': "请选择起始时间",
        'please_use_youzone': "请用友空间扫一扫二维码进行预览",
        'differentiate_agendas': "区分上下午议程",
        'channel': "渠道",
        'cancel': "取消",
        'all': "全部",
        'all_personnel': "全部人员",
        'all_agendas': "全部议程",
        'reject_the_selected_person': "确定驳回所选人员?",
        'reject_the_person': "确定驳回这个人员?",
        'agree_the_selected_person': "确定同意所选人员?",
        'agree_the_person': "确定同意这个人员?",
        'enable_invitation_code': "确定要启用邀请码?",
        'disable_invitation_code': "确定要停用邀请码?",
        'confirm': "确认",
        'confirm_to_reject': "确认驳回",
        'confirm_to_delete': "确认删除",
        'delete_the_guide': "确认删除这个指南?",
        'confirm_to_agree': "确认同意",
        'face_recognition': "人脸识别",
        'scan_qr_code_to_join_space': "扫码加入空间参与抽奖",
        'scan_qr_code_to_check_in': "扫码签到",
        'delete': "删除",
        'deleted_successfully': "删除成功",
        'failed_to_delete': "删除失败",
        'morning_agenda': "上午议程",
        'afternoon_agenda': "下午议程",
        'settings': "设置",
        'set_blacklist': "设置黑名单",
        'number_of_approved_persons': "审核通过人数",
        'approval_result': "审批结果",
        'generate_installation': "生成安装包地址",
        'failure_prompt': "失败引导语",
        'usage': "使用办法",
        'event': "事件",
        'full_screen': "是否全屏",
        'require_check_in': "是否需要签到",
        'require_invitation_code': "是否需要邀请码:",
        'mobile': "手机",
        'description': "说明：{meeting}表示大会名称，{activity}表示会场名称，{prize}表示奖品名称",
        'description_two': "说明：此页面用于抽奖设置黑名单，加入黑名单中的人员，不会中任何奖项。",
        'tips': "提示",
        'add_conference': "添加大会",
        'add_prize': "添加奖项",
        'add_personnel': "添加人员",
        'add_invitation_code': "添加邀请码",
        'add_agenda': "添加议程",
        'disable': "停用",
        'stop_lucky_draw': "停止抽奖",
        'passed': "通过",
        'screen_mirroring_method': "投屏方式",
        'screen_mirroring_presentation_method': "投屏展示方式",
        'drawn_qty': "图片已抽数量",
        'push_notification': "推送应用消息",
        'URL': "网页链接",
        'not_started': "未开始",
        'not_approved': "未审批",
        'the_data_is': "我们对这些数据做了黄色标识，请下载修改后重新导入。",
        'loop_automaticall': "无数据时自动开启循环",
        'download': "下载",
        'download_import_template': "下载导入模板",
        'download_qr_code': "下载二维码",
        'details': "详情",
        'message_link': "消息链接",
        'message_content': "消息内容",
        'message_info': "消息信息",
        'small': "小",
        'new_attendee': '新增人员',
        'new_user_defined_item': "新增自定义",
        'name': "姓名",
        'required': "需要",
        'live_required': "需要直播",
        'select_person': "选人",
        'select': "选择",
        'select_start_time': "选择起始时间",
        'select_guide': "选择指南",
        'invitation_code': "邀请码",
        'exceed_characters': "邀请码不能超过20个字",
        'invitation_code_is_required': "邀请码不能为空",
        'applicants': "已报名人数",
        'rejected': "已驳回",
        'copied_to_clipboard': "已复制到粘贴板",
        'loaded_all': "已加载全部",
        'ended': "已结束",
        'enabled': "已启用",
        'checked_in': "已签到",
        'checked_in_personnel': "已签到人员",
        'disabled': "停用",
        'passed-two': "已通过",
        'agree': "同意",
        'agreed': "已同意",
        'selected': "已选择",
        'agenda': "议程管理",
        'apps': "应用管理",
        'email': "邮箱",
        'youzone': "友空间",
        'preview': "预览",
        'no_data': "暂无数据",
        'live_URL': "直播地址",
        'live_settings': "直播设置",
        'live_time': "直播时间",
        'live_subject': "直播主题",
        'position': "职位",
        'guide_name': "指南名称",
        'guide_name_two': "指南名称不能超过10个字",
        'guide_name_three': "指南名称不能为空",
        'to': "至",
        'zhong': "中",
        'winner_list': "中奖名单",
        'winning_messages': "中奖消息",
        'duplicated_check_in_tips': "重复签到提示语",
        'note': "注：图片比例建议2:1，大小不超过10M（支持上传格式PNG、JPG）",
        'roulette': "转盘抽奖",
        'status': "状态",
        'upload_custom_background_picture': "自定义背景图上传",
        'field_name_two': "字段名称不能超过15个字",
        'field_name_is_required': "字段名称不能为空",
        'barrage_font_size': "字体弹幕大小",
        'total_qty': "总数量",
        'org': "组织",
        'approved': "已审批",
        'submit': "提交",
        'add_guide': '添加指南',
        'select_guide': '请选择指南',
        'select_time': "请选择时间",
        'custom_background_upload': "自定义背景上传",
        'identifying_code': "验证码",
        'please_enter_identifying_code': "请输入验证码",
        'get_identifying_code': "获取验证码",
        'sign_up_and_share': "报名分享",
        'qr_code_application_page': "扫描二维码后可分享报名页面",
        'save_success': "保存成功",
        'add_activity': "添加活动",
        'please_select_date': "请选择日期",
        'time_five': "时间",
        'export_data': "导出数据",
        'live_mgmt': "直播管理",
        'update_staff_scope': "更新签到人员范围成功!",
        'copy_to_paste_version': "已复制到粘贴版",
        'success_join_team': "签到成功加入团队消息",
        'enter_greetings': "请输入成功欢迎语",
        'fail_greetings': "失败欢迎语",
        'enter_fail_greetings': "请输入失败欢迎语",
        'duplicate_checkin_prompt': "请输入重复签到提示语",
        'not_check_in': 　 "未签到",
        'meeting_prize': "恭喜您，获得{meeting}大会{activity}会场，{prize}奖品一份，立即联系工作人员领取奖品吧",
        'prize_exhausted': "奖品已抽完！",
        'select_prize': "选择奖项",
        'number_of_prizes': "抽奖数量",
        'unreviewed': "未审核",
        'input_keywords_speech': "请输入关键词筛选发言",
        'importing_users': "导入用户",
        'download_import_template': "下载导入模板",
        'please_start_time': "请选择开始时间",
        'deactivated': "已停用",
        'picture': "图片",
        'number_pumped': "已抽数量",
        'content_of_the_speech': "发言内容",
        'endtime_less_starttime': "报名截止时间不能小于开始时间",
        'confirm_to': "确定要",

        'input_keyword': "关键词",
        'feed_time': '发言时间',
        'barrage_screen_mirroring': '弹幕投屏',
        'download_failure': "下载失败",

        'admin': "管理员",

        'face_package_address': "人脸识别安装包地址",
        'hint': "温馨提示",
        'meeting_id': "会议ID号",
        'install_success_code': "iPad端人脸识别安装成功后，复制会议ID号或扫描会议ID二维码查看会议详情",
        'after_install_package': "请在获取会议ID后，再进行ipad端安装包的下载与安装",
        'face_success_prompt': "人脸识别成功提示",
        'face_failed_prompt': "人脸识别失败提示",
        'check_repeat_prompt': "签到重复提示",
        'enter_prompt_content': "请输入提示语",
        'copy_success': "复制成功",
        'post_on_wall': '发言上墙',
        'interact_with_others': '来友空间“动态”发言 火热互动',
        'win_present_posts': '在友空间动态发言就有机会在大屏幕上展示你的发言哦',
        'mainadmin': '主办方工作人员',
        'confirm_cancel': '确认取消',
        'confirm_cancel_two': "确定取消这个人员?",
        'select_person': '选择人员',
        'custom_invitation_code': '自定义邀请码',
        'invitation_code_channel': '邀请码渠道',
        'create_invitation_code':'创建邀请码',
        'alphabetdigit':'创建邀请码，字母和数字组合，长度6~10位之间。',
        'input6invitationcodes': '请输入6-10位邀请码',
        'invitation_code_repeat': '邀请码重复',
        'setup_main_activity': '设置为主会场',
        'setup_main_activity_s': '设置主会场成功',
        'cancel_main_activity_s': '取消主会场成功',
        'existing_main_activity':'已存在主会场',
        'uploading_failed_two': '图片上传失败，请重新上传',
        'p_change_code': '请改变邀请码',
        'p_onetoone': '请上传1:1的图片',
        'p_num_zimu': '请输入数字或字母'
    }
};