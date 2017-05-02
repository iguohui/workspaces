(function ($, window, undefined) {
    $.widget("ui.divTree", {
        options: {
            user_id: $.fn.getCookie("user_id"),
            is_author: false,
            admin: false,
            async: true,
        },
        _create: function () {

        },
        _init: function () {

        },

        _remodelData: function (data) {
            var res = {};
            res.core = {
                "animation": 0,
                "check_callback": true,
            };
            res.plugins = [
                "contextmenu",
                // "dnd",
                // "massload",
                "search",
                // "state",
                // "types",
                // "unique",
                // "wholerow",
                // "changed",
                // "conditionalselect"
            ]
            var all = {"id": "all", text: "全部", state: {"opened": true}};
            res.core.data = [all];
            var treeData = all.children = [];
            for (var i = 0; i < data.length; i++) {
                var eachRow = {};
                var eachGroup = data[i];
                eachRow.id = eachGroup.groupId;
                eachRow.text = eachGroup.groupName;
                eachRow.parentId = eachGroup.parentId;
                eachRow.groupCode = eachGroup.groupCode;
                eachRow.data = {};
                eachRow.state = {"opened": "true"};
                treeData.push(eachRow);
            }
            /**
             * 没有级次之分
             */
            for (var i = treeData.length - 1; i >= 0; i--) {
                var eachRow = treeData[i];
                var parentId = eachRow.parentId;
                if (parentId == null) {
                    continue;
                }
                loopDeep(treeData, null, eachRow, i);
            }
            function loopDeep(treeData, childrenData, target, targetIndex) {
                var data = childrenData == null ? treeData : childrenData;
                if (data == null || typeof(data) == "undefined") {
                    return;
                }
                for (var i = data.length - 1; i >= 0; i--) {
                    if (i == targetIndex && !childrenData) {
                        continue;
                    }
                    var children = data[i].children;
                    if (target.parentId == data[i].id) {
                        if (!(children instanceof Array)) {
                            children = data[i].children = [];
                        }
                        children.push(eachRow);
                        treeData.splice(targetIndex, 1);
                        break;
                    } else if (children) {
                        loopDeep(data, children, target, targetIndex);
                    }
                }
            }

            return res;
        },

        refresh: function () {
            var that = this;
            if (this.options.user_id) {
                $.ajax({
                    url: $.fn.baseURL + (this.options.admin ? "/usermanger/getAllLstGroup.do" : "/usermanger/getLstGroupByUserId.do"),
                    data: {user_id: this.options.user_id, is_author: this.options.is_author},
                    type: "POST",
                    async: this.options.async,
                    success: function (data) {
                        $(that.bindings[0]).jstree(that._remodelData(data));
                    }
                });
            }
        },

        getData: function () {
            var that = this;
            var list = [];
            var temp = $(that.bindings[0]).jstree(true)._model.data;
            $.each(temp, function (i, v) {
                var row = {};
                row.groupId = v.id;
                if (row.groupId == "#" || row.groupId == "all") {
                }else{
                    row.groupName = v.text;
                    row.groupCode = v.original.groupCode;
                    row.parentId = v.parent;
                    list.push(row);
                }
            });
            return list;
        }

    })
})(jQuery, window, undefined)