//自己定义一个动态路由规则
module.exports= {
    "/api/": "/",
    "/:id": "/news/:id",
    "/news/:id/show": "/news/:id",
    "/topics/:id/show": "/news/:id",
}
module.exports= {
    "/api/": "/",
    "/:id": "/nes/:id",
    "/nes/:id/show": "/nes/:id",
    "/topics/:id/show": "/nes/:id",
}
//module.exports= {
//  "/api/": "/",
//  "/:id": "/cs/:id",
//  "/cs/:id/show": "/cs/:id",
//  "/topics/:id/show": "/cs/:id",
//}
