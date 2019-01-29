/**
 * 中文繁体语言包
 * rongqb@yonyou.com
 * 20180711
 */
export default {
    id: 'zht',
    // exp: /(?:zh[\-\_]HK|zh[\-\_]TW|zh[\-\_]MO|HK|TW|MO)/i,
    exp: /zht/i,
    name: '繁体中文',
    config: {
        'uploadfailed': "圖片上傳失敗",
        'human_faces_via': "(開啟後，可在手機APP使用采集人臉照片)",
        'characters': "字",
        'day': "天",
        'week': "周",
        'd': "2D",
        'd_lucky_draw_screen_mirroring': "2D抽獎投屏",
        'd_check_in_screen_mirroring': "2D簽到投屏",
        'dd': "3D",
        'd_lucky_draw_screen_mirroring': "2D抽獎投屏",
        'd_check_in_screen_mirroring': "3D簽到投屏",
        'd_countdown': "3D倒計時",
        'd_roulette': "3D轉盤抽獎",
        'd_roulette_for_over': "3D轉盤抽獎（適合50人以上）",
        'include': "包括:",
        'save': "保存",
        'check_in_list': "簽到名單",
        'lucky_draw': "幸運抽獎",
        'h5_from_design': "報名h5設計",
        'h5_from_fields': "報名h5字段配置",
        'registration': "報名管理",
        'applicants_and_attendees': "報名和參會人員",
        'start_time_one': "報名開始時間:",
        'end_time': "報名截止時間:",
        'end_time_cannot_start_time': "報名截止時間不能小於開始時間",
        'registration_configuration': "報名配置",
        'applicant': "報名人員",
        'registration_approval': "報名審批",
        'registration_time': "報名時間",
        'background_settings': "背景設置",
        'required': "必填",
        'edit': "編輯",
        'edit_icon': "編輯圖標",
        'edit_guide': "編輯指南",
        'title': "標題",
        'title_is_required': "標題不能為空",
        'reject': "駁回",
        'do_not_join_team': "不加入團隊",
        'activity_being_opened_cannot_be_deleted': "不可刪除正在打開的活動",
        'do_not_push_app_message': "不推送應用消息",
        'not_needed': "不需要",
        'live_broadcasting_not_needed': "不需要直播",
        'attendee': "參會人員",
        'attendee_mgmt': "參會人員管理",
        'attendee_list': "人員列表",
        'operation': "操作",
        'operation_succeeded': "操作成功",
        'operation_failed': "操作失敗",
        'query_one': "查詢",
        'greetings': "成功歡迎語",
        'member': "成員",
        'lucky_draw_scope': "抽獎範圍",
        'lucky_draw': "抽獎管理",
        'lucky_draw_screen_mirroring': "抽獎投屏",
        'created_successfully': "創建成功",
        'create_conference': "創建大會",
        'failed_to_create': "創建失敗",
        'create_invitation_code': "創建邀請碼",
        'big': '大',
        'conference_cover_picture': "大會封面圖",
        'conference_mgmt': "大會管理",
        'conference_ads_picture': "大會廣告圖",
        'conference_basic_info': "大會基礎信息",
        'conference_list': "大會列表",
        'conference': "大會名稱",
        'conference_time': "大會時間",
        'conference_applications': "大會應用管理",
        'conference_guideline': "大會指南",
        'conference_subject': "大會主題",
        'pending_approval': "待審批",
        'barrage_speed': "彈幕速度",
        'import_succeeded': "導入成功",
        'import_personnel': "導入人員",
        'import_failed': "導入失敗",
        'import_data': "導入數據",
        'export_winner_list': "導出獲獎名單",
        'qr_code': "二維碼",
        'published_by': "發布人",
        'post': "發布內容",
        'screen_mirroring': "發言投屏",
        'share': "分享",
        'attachment_size_exceeds_limit': "附件大小超出範圍",
        'invalid_attachment_format': "附件格式不符合",
        'copy': "復制",
        'sub_title': "副標題",
        'record': '個數據',
        'updated_successfully': "更新成功",
        'check_in_settings_updated_successfully': "更新簽到設置成功!",
        'failed_to_update': "更新失敗",
        'company': "公司",
        'congratulations_prize': "恭喜您，獲得{{conference.name}}大會{{activity.name}}會場，{{prize.prize}}：{{prize.prizeName}}獎品壹份，立即聯系工作人員領取獎品吧",
        'congratulations': "恭喜您中獎了",
        'close': "關閉",
        'interactive_barrage': "互動彈幕管理",
        'activity_mgmt': "活動管理",
        'activity_title': "活動名稱",
        'activity_date': "活動日期",
        'activity_time': "活動時間",
        'winner_list': "獲獎名單",
        'obtain_meeting_code': "獲取會議號",
        'basic_info': "基礎信息",
        'join_team': "加入團隊",
        'load_more': "加載更多",
        'failed_to_load': "加載失敗",
        'reload': "重新加載",
        'recommended_picture_size': "建議上傳圖片尺寸1920*1080,大小不超過10M",
        'prize': "獎項",
        'prize_name': "獎項名稱",
        'end_time_two': "結束時間",
        'in_progress': "進行中",
        'enable': "開啟",
        'enable_face_recognition': "開啟人臉識別",
        'enable_face_recognition_to_gather_face_data': "開啟人臉識別集顏值",
        'start_lucky_draw': "開始抽獎",
        'start_time': "開始時間",
        'fast': "快",
        'lucky_draw_tip': "快捷鍵“shfit+enter”控制抽獎的開始與結束，妳要註意自己的洪荒之力哦，點擊壹次即第壹次",
        'slow': "慢",
        'select_no_more_than_one': "每次選擇不可超過",
        'select_no_more_than_two': "人，請分批選擇",
        'internal_group': "內部群",
        'content_is_required': "內容不能為空",
        'confirm_to_delete_the_prize': "妳確定刪除這個獎品?",
        'confirm_to_delete_the_member': "妳確定刪除這個成員?",
        'confirm_to_delete_the_activity': "妳確定刪除這個活動?",
        'confirm_to_delete_the_agenda': "妳確定刪除這個議程?",
        'confirm_to_delete_the_conference': "妳確定刪除這個大會?",
        'successfully_imported_tips': "您成功導入參會人員 ",
        'successfully_imported_two': "人。",
        'download_tips': "您可以直接下載Excel模板，按照指定格式編輯導入用戶信息，然後導入數據。",
        'failed_tips': "您提供的excel中有",
        'failed_tips_one': "條成功，",
        'failed_tips_two': "條數據不符合導入規則，",
        'failed_tips_three': "我們對這些數據做了黃色標識，請下載修改後重新導入。",
        'failed_tips_four': "請核對上傳的表格是否符合約定規範，請按照約定規範重新上傳。",
        'batch_reject': "批量駁回",
        'batch_agree': "批量同意",
        'other': "其他",
        'enable_two': "啟用",
        'checked_in_successfully': "簽到成功，您是第{{record.sequence}}位簽到人員！",
        'add_the_checked_in_users_into_the_team': "簽到成功加入到團隊",
        'send_message_to_the_checked_in_users': "簽到成功推送應用消息",
        'check_in_qr_code': "簽到二維碼",
        'check_in_mgmt': "簽到管理",
        'check_in_personnel_range': "簽到人員範圍",
        'check_in_failed': "簽到失敗，請聯系工作人員幫您簽到！",
        'check_in_tips': "簽到提示語",
        'check_in_statistics': "簽到統計",
        'check_in_screen_mirroring': "簽到投屏",
        'clear': "清空",
        'clear_Barrage_data': "清空彈幕數據",
        'check_tip': "請勾選兩個及以上人員",
        'please_enter': "請輸入",
        'please_enter_conference_name': "請輸入大會名稱",
        'please_enter_conference_subject': "請輸入大會主題",
        'please_enter_company': "請輸入公司",
        'please_enter_filtering_keyword': "請輸入關鍵詞篩選",
        'please_enter_prize': "請輸入獎項",
        'please_enter_prize_name': "請輸入獎項名稱",
        'please_enter_mobile_number': "請輸入手機號",
        'please_enter_search_content': "請輸入搜索內容",
        'please_enter_message_content_to_push': "請輸入推送消息內容（必填）",
        'please_enter_URL': "請輸入網頁鏈接",
        'please_enter_name': "請輸入姓名",
        'please_enter_the_name_to_search': "請輸入姓名進行搜索",
        'please_enter_invitation_code': "請輸入邀請碼渠道，1-20個字",
        'please_enter_email': "請輸入郵箱",
        'please_enter_live_broadcasting': "請輸入直播地址",
        'please_enter_live_broadcasting_subject': "請輸入直播主題",
        'please_enter_position': "請輸入職位",
        'please_enter_field': "請輸入字段",
        'please_first_allow': "請先允許打開瀏覽器新窗口",
        'please_select': "請選擇",
        'please_select_background_picture': "請選擇背景圖",
        'please_select_start_time': "請選擇起始時間",
        'please_use_youzone': "請用友空間掃壹掃二維碼進行預覽",
        'differentiate_agendas': "區分上下午議程",
        'channel': "渠道",
        'cancel': "取消",
        'all': "全部",
        'all_personnel': "全部人員",
        'all_agendas': "全部議程",
        'reject_the_selected_person': "確定駁回所選人員?",
        'reject_the_person': "確定駁回這個人員?",
        'agree_the_selected_person': "確定同意所選人員?",
        'agree_the_person': "確定同意這個人員?",
        'enable_invitation_code': "確定要啟用邀請碼?",
        'disable_invitation_code': "確定要停用邀請碼?",
        'confirm': "確認",
        'confirm_to_reject': "確認駁回",
        'confirm_to_delete': "確認刪除",
        'delete_the_guide': "確認刪除這個指南?",
        'confirm_to_agree': "確認同意",
        'face_recognition': "人臉識別",
        'scan_qr_code_to_join_space': "掃碼加入空間參與抽獎",
        'scan_qr_code_to_check_in': "掃碼簽到",
        'delete': "刪除",
        'deleted_successfully': "刪除成功",
        'failed_to_delete': "刪除失敗",
        'morning_agenda': "上午議程",
        'afternoon_agenda': "下午議程",
        'settings': "設置",
        'set_blacklist': "設置黑名單",
        'number_of_approved_persons': "審核通過人數",
        'approval_result': "審批結果",
        'generate_installation': "生成安裝包地址",
        'failure_prompt': "失敗引導語",
        'usage': "使用辦法",
        'event': "事件",
        'full_screen': "是否全屏",
        'require_check_in': "是否需要簽到",
        'require_invitation_code': "是否需要邀請碼:",
        'mobile': "手機",
        'description': "說明：{meeting}表示大會名稱，{activity}表示會場名稱，{prize}表示獎品名稱",
        'description_two': "說明：此頁面用於抽獎設置黑名單，加入黑名單中的人員，不會中任何獎項。",
        'tips': "提示",
        'add_conference': "添加大會",
        'add_prize': "添加獎項",
        'add_personnel': "添加人員",
        'add_invitation_code': "添加邀請碼",
        'add_agenda': "添加議程",
        'disable': "停用",
        'stop_lucky_draw': "停止抽獎",
        'passed': "通過",
        'screen_mirroring_method': "投屏方式",
        'screen_mirroring_presentation_method': "投屏展示方式",
        'drawn_qty': "圖片已抽數量",
        'push_notification': "推送應用消息",
        'URL': "網頁鏈接",
        'not_started': "未開始",
        'not_approved': "未審批",
        'the_data_is': "我們對這些數據做了黃色標識，請下載修改後重新導入。",
        'loop_automaticall': "無數據時自動開啟循環",
        'download': "下載",
        'download_import_template': "下載導入模板",
        'download_qr_code': "下載二維碼",
        'details': "詳情",
        'message_link': "消息鏈接",
        'message_content': "消息內容",
        'message_info': "消息信息",
        'small': "小",
        'new_attendee': '新增人員',
        'new_user_defined_item': "新增自定義",
        'name': "姓名",
        'required': "需要",
        'live_required': "需要直播",
        'select_person': "選人",
        'select': "選擇",
        'select_start_time': "選擇起始時間",
        'select_guide': "選擇指南",
        'invitation_code': "邀請碼",
        'exceed_characters': "邀請碼不能超過20個字",
        'invitation_code_is_required': "邀請碼不能為空",
        'applicants': "已報名人數",
        'rejected': "已駁回",
        'copied_to_clipboard': "已復制到粘貼板",
        'loaded_all': "已加載全部",
        'ended': "已結束",
        'enabled': "已啟用",
        'checked_in': "已簽到",
        'checked_in_personnel': "已簽到人員",
        'disabled': "停用",
        'passed-two': "已通過",
        'agree': "同意",
        'agreed': "已同意",
        'selected': "已選擇",
        'agenda': "議程管理",
        'apps': "應用管理",
        'email': "郵箱",
        'youzone': "友空間",
        'preview': "預覽",
        'no_data': "暫無數據",
        'live_URL': "直播地址",
        'live_settings': "直播設置",
        'live_time': "直播時間",
        'live_subject': "直播主題",
        'position': "職位",
        'guide_name': "指南名稱",
        'guide_name_two': "指南名稱不能超過10個字",
        'guide_name_three': "指南名稱不能為空",
        'to': "至",
        'zhong': "中",
        'winner_list': "中獎名單",
        'winning_messages': "中獎消息",
        'duplicated_check_in_tips': "重復簽到提示語",
        'note': "註：圖片比例建議2:1，大小不超過10M（支持上傳格式PNG、JPG）",
        'roulette': "轉盤抽獎",
        'status': "狀態",
        'upload_custom_background_picture': "自定義背景圖上傳",
        'field_name_two': "字段名稱不能超過15個字",
        'field_name_is_required': "字段名稱不能為空",
        'barrage_font_size': "字體彈幕大小",
        'total_qty': "總數量",
        'org': "組織",
        'approved': "已審批",
        'submit': "提交",
        'add_guide': '添加指南',
        'select_guide': '請選擇指南',
        'select_time': "請選擇時間",
        'custom_background_upload': "自定義背景上傳",
        'identifying_code': "驗證碼",
        'please_enter_identifying_code': "請輸入驗證碼",
        'get_identifying_code': "獲取驗證碼",
        'sign_up_and_share': "報名分享",
        'qr_code_application_page': "掃描二維碼後可分享報名頁面",
        'save_success': "保存成功",
        'add_activity': "添加活動",
        'please_select_date': "請選擇日期",
        'time_five': "時間",
        'export_data': "導出數據",
        'live_mgmt': "直播管理",
        'update_staff_scope': "更新簽到人員範圍成功!",
        'copy_to_paste_version': "已復制到粘貼版",
        'success_join_team': "簽到成功加入團隊消息",
        'enter_greetings': "請輸入成功歡迎語",
        'fail_greetings': "失敗歡迎語",
        'enter_fail_greetings': "請輸入失敗歡迎語",
        'duplicate_checkin_prompt': "請輸入重復簽到提示語",
        'not_check_in': 　 "未簽到",
        'meeting_prize': "恭喜您，獲得{meeting}大會{activity}會場，{prize}獎品壹份，立即聯系工作人員領取獎品吧",
        'prize_exhausted': "獎品已抽完！",
        'select_prize': "選擇獎項",
        'number_of_prizes': "抽獎數量",
        'unreviewed': "未審核",
        'input_keywords_speech': "請輸入關鍵詞篩選發言",
        'importing_users': "導入用戶",
        'download_import_template': "下載導入模板",
        'please_start_time': "請選擇開始時間",
        'deactivated': "已停用",
        'picture': "圖片",
        'number_pumped': "已抽數量",
        'content_of_the_speech': "發言內容",
        'endtime_less_starttime': "報名截止時間不能小於開始時間",
        'confirm_to': "確定要",

        'input_keyword': "關鍵詞",
        'feed_time': '發言時間',
        'barrage_screen_mirroring': '彈幕投屏',
        'download_failure': '下載失敗',

        'admin': "管理員",

        'face_package_address': "人臉識別安裝包地址",
        'hint': "溫馨提示",
        'meeting_id': "會議ID號",
        'install_success_code': "iPad端人臉識別安裝成功後，複製會議ID號或掃描會議ID二維碼查看會議詳情",
        'after_install_package': "請在獲取會議ID後，在進行ipad端安裝包的下載與安裝",
        'face_success_prompt': "人臉識別成功提示",
        'face_failed_prompt': "人臉識別失敗提示",
        'check_repeat_prompt': "簽到重複提示",
        'enter_prompt_content': "請輸入提示語",
        'copy_success': "複製成功",
        'barrage_screen': '彈幕投屏',
        'post_on_wall': '發言上牆',
        'interact_with_others': '來友空間“動態”發言 火熱互動',
        'win_present_posts': '在友空間動態發言就有機會在大螢幕上展示你的發言哦',
        'mainadmin': '主辦方工作人員',
        'confirm_cancel': '確認取消',
        'confirm_cancel_two': "確定取消這個人員?",
        'select_person': '選擇人員',
        'confirm_cancel': '确认取消',
        'confirm_cancel_two': "确定取消这个人员?",
        'select_person': '选择人员',
        'custom_invitation_code': '自定義邀請碼',
        'invitation_code_channel': '邀請碼渠道',
        'create_invitation_code':'創建邀請碼',
        'alphabetdigit':'創建邀請碼，字母和數字組合，長度6~10位之間。',
        'input6invitationcodes': '請輸入6-10位邀請碼',
        'invitation_code_repeat': '邀請碼重複',
        'setup_main_activity': '設置為主會場',
        'setup_main_activity_s': '設置主會場成功',
        'cancel_main_activity_s': '取消主會場成功',
        'existing_main_activity':'已存在主會場',
        'uploading_failed_two': '圖片上傳失敗，請重新上傳',
        'p_change_code': '請改變邀請碼',
        'p_onetoone': '請上傳1:1的圖片',
        'p_num_zimu': '請輸入數字或字母'
    }
};