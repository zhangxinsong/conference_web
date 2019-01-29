import BaseList from 'app_src/utils/baseList';
import * as bgActions from 'app_src/actions/background';

export default {
    props: ['id'],
    methods: {
        removeCover(id, success, error) {
            if (id &&
                this.id && ['SIGN_UP', 'SIGN_IN', 'LIVE', 'LOTTERY', 'BARRAGE', 'COMMON', 'NEWS_FEED'].indexOf(this.model) != -1) {
                bgActions.remove({
                    backgroundId: id,
                    conferenceId: this.id,
                    backgroundType: this.model,
                    success: res => {
                        this.coverList.remove(id);
                        success && success(res);
                    },
                    error: error,
                });
            }
        },
        loadData(callback) {
            this.initForm(this.data);
            // callback && callback(res);
        },
        initForm() {

        },
        clearInput() {
            this.form && this.form.forEach(item => {
                if (item.value) {
                    item.value = '';
                } else if (item.file && item.file.path) {
                    item.file.path = '';
                } else if (item[0] && item[1]) {
                    item[0] = '';
                    item[1] = '';
                }
            });
        },
        timeToStamp(time, date) {
            return new Date(`${(date? new Date(date): new Date()).format('yyyy/MM/dd')} ${time}`).getTime()
        },
        getCoverList() {
            if (['SIGN_UP', 'SIGN_IN', 'LIVE', 'LOTTERY', 'BARRAGE', 'COMMON', 'NEWS_FEED'].indexOf(this.model) != -1) {
                bgActions.getList({
                    conferenceId: this.id,
                    backgroundType: this.model,
                    success: res => {
                        if (Array.isArray(res)) {
                            res.forEach(item => {
                                this.coverList.set(item.backgroundId, item);
                            });
                            setTimeout(() => {
                                const first = this.coverList.getFirst();
                                if (first) {
                                    const temp = ['backgroundUrl', 'background', 'projectionBackground'];
                                    temp.forEach(item => {
                                        const target = this.cache.get(item);
                                        if (target && !target.value) {
                                            target.value = first.background;
                                        }
                                    });
                                }
                            }, 1000);
                        }
                    }
                });
            }
        },
        reloadData() {
            this.loadData(res => {
                if (res && res.constructor === Object) {
                    this.data = res;
                    this.initForm(this.data);
                }
            });
        }
    },
    data() {
        return {
            form: null,
            map: null,
            data: null,
            cache: null,
            coverList: new BaseList()
        }
    },
    computed: {
        formData() {
            const data = {};
            let date;
            this.form && this.form.forEach(item => {
                if (item.type == 'text' ||
                    item.type == 'select' ||
                    item.type == 'upload' ||
                    item.type == 'email' ||
                    item.type == 'radio' ||
                    item.type == 'textarea' ||
                    item.type == 'tel' ||
                    item.type == 'slider') {
                    if (item.id) {
                        data[item.id] = item.value || '';
                        if (item.type == 'radio' ||
                            item.type == 'select') {
                            if (item.value === 'true') {
                                data[item.id] = true;
                            } else if (item.value === 'false') {
                                data[item.id] = false;
                            }
                        }
                    }
                } else if (item.type == 'date') {
                    if (item.id) {
                        date = data[item.id] = new Date(item.value).getTime() || 0;
                    }
                } else if (item.type == 'selectAdmin') {
                    if (item.id) {
                        data[item.id] = item.value || [];
                    }
                } else if (item.type == 'selectHelpSign') {
                    if (item.id) {
                        data[item.id] = item.value || [];
                    }
                } else if (item.type == 'checkbox') {
                    if (item.id) {
                        data[item.id] = !!item.value || false;
                    }
                } else if (item.type == 'number') {
                    if (item.id) {
                        data[item.id] = item.value || 0;
                    }
                } else if (item.type == 'dateRange' ||
                    item.type == 'timeRange') {
                    if (Array.isArray(item.value) &&
                        item.value[0] && item.value[1]) {

                        if (item.startId &&
                            item.endId) {
                            if (item.type == 'timeRange') {
                                if (item.timeTurn) {
                                    data[item.startId] = this.timeToStamp(item.value[0], item.date || date);
                                    data[item.endId] = this.timeToStamp(item.value[1], item.date || date);
                                } else {
                                    data[item.startId] = item.value[0];
                                    data[item.endId] = item.value[1];
                                }
                            } else {
                                data[item.startId] = new Date(item.value[0]).getTime() || 0;
                                data[item.endId] = new Date(item.value[1]).getTime() || 0;
                            }
                        }
                    } else {
                        data[item.startId] = '';
                        data[item.endId] = '';
                    }
                }
            });
            return data;
        },
        pass() {
            let empty = false;
            this.form && this.form.forEach(item => {
                if (item.type == 'text' ||
                    item.type == 'date' ||
                    item.type == 'radio' ||
                    item.type == 'email' ||
                    item.type == 'textarea' ||
                    item.type == 'tel' ||
                    item.type == 'upload' ||
                    item.type == 'selectAdmin' ||
                    item.type == 'select' ||
                    item.type == 'slider') {
                    if (!item.value &&
                        item.required !== false) {
                        empty = true;
                    }
                }

                if (item.type == 'checkbox') {
                    if (typeof item.value != 'boolean' &&
                        item.required !== false) {
                        empty = true;
                    }
                }

                // if (item.type == 'selectAdmin') {
                //     if ((!item.value || !item.value.length) &&
                //         item.required !== false) {
                //         empty = true;
                //     }
                // }

                if (item.type == 'number') {
                    if ((typeof item.value != 'number' &&
                            item.required !== false) || (item.validate && !item.validate(item.value))) {
                        empty = true;
                    }
                }

                if (item.type == 'dateRange' ||
                    item.type == 'timeRange') {
                    if (!(Array.isArray(item.value) &&
                            item.value[0] && item.value[1]) &&
                        item.required !== false) {
                        empty = true;
                    }
                }
            });

            if (!this.data) {
                return !empty;
            } else {
                try {
                    for (let x in this.formData) {
                        if (this.formData.hasOwnProperty(x)) {
                            if (this.formData[x] != this.data[x]) {
                                return !empty;
                            }
                        }
                    }
                } catch (e) {}
            }
            return false;
        },

    },
    created() {
        this.$set(this, 'cache', new BaseList());
        this.$set(this, 'form', this.cache.getAll());
        this.$set(this, 'map', this.cache.getMap());

        this.initForm(this.data);

        this.getCoverList();
        this.reloadData();
    }
}