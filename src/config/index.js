/**
 * 配置文件
 * @author rongqb@yonyou.com
 * @date 20180714
 */
const config = {
    development: {
        env: 'test',
        apiHost: 'http://140.143.133.139:8080/',
        projection: {
            signin: {
                '2d': '/copyassets/static/html/sign2d.html',
                '3d': '/copyassets/static/html/sign3d.html',
            },
            lottery: {
                '2d': '/copyassets/static/html/lucky2d.html',
                '3d': '/copyassets/static/html/lucky3d.html',
            },
            other: {
                'countDown3d': '/copyassets/static/html/countdown3d.html',
            },
            feed: '/copyassets/static/html/speakWall.html',
            barrage: 'copyassets/static/html/barrage_new.html',
        },
        shortUrl: 'face_test'
    },
    test: {
        env: 'test',
        apiHost: 'http://140.143.133.139:8080/',
        projection: {
            signin: {
                '2d': '/conference/web/copyassets/static/html/sign2d.html',
                '3d': '/conference/web/copyassets/static/html/sign3d.html',
            },
            lottery: {
                '2d': '/conference/web/copyassets/static/html/lucky2d.html',
                '3d': '/conference/web/copyassets/static/html/lucky3d.html',
            },
            other: {
                'countDown3d': '/conference/web/copyassets/static/html/countdown3d.html',
            },
            feed: '/conference/web/copyassets/static/html/speakWall.html',
            barrage: '/conference/web/copyassets/static/html/barrage_new.html',
        },
        shortUrl: 'face_test'
    },
    daily: {
        env: 'daily',
        apiHost: 'http://140.143.133.139:8080/',
        projection: {
            signin: {
                '2d': '/conference/web/copyassets/static/html/sign2d.html',
                '3d': '/conference/web/copyassets/static/html/sign3d.html',
            },
            lottery: {
                '2d': '/conference/web/copyassets/static/html/lucky2d.html',
                '3d': '/conference/web/copyassets/static/html/lucky3d.html',
            },
            other: {
                'countDown3d': '/conference/web/copyassets/static/html/countdown3d.html',
            },
            feed: '/conference/web/copyassets/static/html/speakWall.html',
            barrage: '/conference/web/copyassets/static/html/barrage_new.html',
        },
        shortUrl: 'face_test'
    },
    prev: {
        env: 'prev',
        apiHost: 'http://140.143.133.139:8080/',
        projection: {
            signin: {
                '2d': '/conference/web/copyassets/static/html/sign2d.html',
                '3d': '/conference/web/copyassets/static/html/sign3d.html',
            },
            lottery: {
                '2d': '/conference/web/copyassets/static/html/lucky2d.html',
                '3d': '/conference/web/copyassets/static/html/lucky3d.html',
            },
            other: {
                'countDown3d': '/conference/web/copyassets/static/html/countdown3d.html',
            },
            feed: '/conference/web/copyassets/static/html/speakWall.html',
            barrage: '/conference/web/copyassets/static/html/barrage_new.html',
        },
        shortUrl: 'face_production'
    },
    production: {
        env: 'build',
        apiHost: 'http://140.143.133.139:8080/',
        projection: {
            signin: {
                '2d': '/conference/web/copyassets/static/html/sign2d.html',
                '3d': '/conference/web/copyassets/static/html/sign3d.html',
            },
            lottery: {
                '2d': '/conference/web/copyassets/static/html/lucky2d.html',
                '3d': '/conference/web/copyassets/static/html/lucky3d.html',
            },
            other: {
                'countDown3d': '/conference/web/copyassets/static/html/countdown3d.html',
            },
            feed: '/conference/web/copyassets/static/html/speakWall.html',
            barrage: '/conference/web/copyassets/static/html/barrage_new.html',
        },
        shortUrl: 'face_production'
    }
};

export default config[__ENV__] || config['development'];