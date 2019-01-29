import Vue from 'vue';

const extender = Vue.extend(require('./index.vue'));
let instance;

extender.prototype.close = function() {
    this.isShow = false;
    this.$el.addEventListener('transitionend', event => {
        event.target.parentNode.removeChild(event.target);
    });
};

const destroy = () => {
    if (instance) {
        instance.close();
        instance = null;
    }
}

export default function confirm(params = {}) {
    instance = instance || new extender().$mount(document.createElement('div'));
    instance.isShow = true;

    for (let x in instance.$data) {
        if (instance.$data.hasOwnProperty(x) &&
            params.hasOwnProperty(x)) {
            instance.$data[x] = params[x];
        }
    }

    instance.onConfirm = () => {
        try {
            params.onConfirm && params.onConfirm();
        } catch (e) {
            params.onError && params.onError(e);
        } finally {
            instance.isShow = false;
        }
    };

    instance.onCancel = () => {
        try {
            params.onCancel && params.onCancel();
        } catch (e) {
            params.onError && params.onError(e);
        } finally {
            instance.isShow = false;
        }
    };
    document.body.appendChild(instance.$el);
}