// admin/start.js
pimcore.registerNS('pimcore.plugin.colorValidation');
alert("start.js");

pimcore.plugin.colorValidation = Class.create({
    initialize: function () {
        Ext.override(pimcore.object.classes.data.color, {
            getLayoutEditItems: function () {
                var colorField = pimcore.object.tags.color.prototype.getLayoutEditItems.call(this);

                colorField.on('change', function () {
                    var selectedColors = this.getValue();
                    if (selectedColors.length > 2) {
                        Ext.Msg.alert('Error', 'Please select only two colors.');
                        this.reset();
                    }
                });

                return colorField;
            }
        });
    }
});

var colorValidationPlugin = new pimcore.plugin.colorValidation();
