pimcore.registerNS("pimcore.plugin.TestBundle");

pimcore.plugin.TestBundle = Class.create({
    initialize: function () {
        // document.addEventListener(pimcore.events.postSaveObject, this.postSaveObject.bind(this));
        document.addEventListener(pimcore.events.preSaveObject, this.preSaveObject.bind(this));
    },

    preSaveObject: function (object, type) {
        // let colors = object.detail.object.data.data.color;
        let colors = object.detail.object.edit.dataFields.color.component.lastValue;
        console.log("Colors:", colors);

        let count = colors.length;
        console.log("count", count);

        if (count > 2) {
            Ext.Msg.alert('Error', 'Colors should not be more than 2.');
            // Prevent the default action of the "preSaveObject" event (object.preventDefault).
            object.preventDefault(); 
            return false;
        }
    },

    // In the pimcoreReady method, we handle the "Save and Publish" button click event.
    pimcoreReady: function (e) {
        // Hook into the "Save and Publish" button's click event
        // Ext.getCmp=> is an Ext JS method used to get a reference to the Ext JS component with the given ID. 

        var saveAndPublishButton = Ext.getCmp('pimcore_button_saveandpublish');
        saveAndPublishButton.on('click', function () {
            // Manually trigger the "preSaveObject" event to perform color validation before saving
            var preSaveEvent = new CustomEvent(pimcore.events.preSaveObject, {
                detail: {
                    object: pimcore.globalmanager.get("object"),
                    type: "object",
                    task: "publish"
                },
                cancelable: true
            });

            const isAllowed = document.dispatchEvent(preSaveEvent);
            if (!isAllowed) {
                // If validation fails, return false to prevent saving and publishing
                return false;
            }
        });
    }
});

var TestBundlePlugin = new pimcore.plugin.TestBundle();
