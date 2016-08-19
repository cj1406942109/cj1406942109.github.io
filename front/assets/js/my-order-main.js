/**
 * Created by dushang on 2016/8/19.
 */
/**
 * Created by dushang on 2016/8/17.
 */
require.config({
    baseUrl:"../assets/",
    paths:{
        "jQuery":"js/common/jquery-2.2.2",
        "bootstrapJs":"bootstrap/js/bootstrap.min",

        "myOrder":"js/my-order",
        "accordion":"accordion/accordion",
        "jPages":"jPages/js/jPages"
    },

    shim:{
        "jQuery": { exports: "$" },
        "bootstrapJs": { deps: ["jQuery"] },
        "accordion":{deps:["jQuery"]},
        "jPages":{deps:["jQuery"]}
    }
});

require(
    [
        "jQuery",
        "myOrder"
    ]
);