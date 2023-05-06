export function NotyS(notif){
    new Noty({
        theme: 'relax',
        text : notif,
        type: "success",
        layout : "topRight",
        timeout : 1500
    }).show();
};

export function NotyE(notif){
    new Noty({
        theme: 'relax',
        text : notif,
        type: "error",
        layout : "topRight",
        timeout : 1500
    }).show();
};
