(function () {
    const sceneUrl = 'demos/activity-heatmap.yaml';
    const map = L.map('map', {
        maxZoom: 20,
        zoomSnap: 0,
        trackResize: true,
        keyboard: false
    });

    map.setView([52.518528, 13.405057], 10);

    const layer = Tangram.leafletLayer({
        scene: sceneUrl,
        logLevel: 'debug'
    });

    layer.scene.subscribe({
        load: function (msg) {
            // scene was loaded
            injectAPIKey(msg.config);
        },
        update: function (msg) {
            // scene was updated
            injectAPIKey(msg.config);
        },
        view_complete: function (msg) {
            // new set of map tiles was rendered
        },
        error: function (msg) {
            // debugger;
        },
        warning: function (msg) {
            // debugger;
        }
    });

    function injectAPIKey(config) {
        if (config.global && config.global.sdk_mapzen_api_key) {
            config.global.sdk_mapzen_api_key = 'mapzen-T3tPjn7';
        }
        else {
            for (var name in config.sources) {
                var source = config.sources[name];
                if (source.url.search('mapzen.com') > -1) {
                    source.url_params = source.url_params || {};
                    source.url_params.api_key = 'mapzen-T3tPjn7';
                }
            }
        }
    }

    window.addEventListener('load', function () {
        console.log('layer.addTo');
        layer.addTo(map);
    });

}());
