var Modle_Texture = {
    head_hair_background: { src: "./texture_hairb.png" },
    head_hair_top: { src: "./texture_hairt.png" },
    head_hair_ex0: { src: "./texture_hair_ex0.png" },
    head_hair_ex1: { src: "./texture_hair_ex1.png" },
    head_hair_left: { src: "./texture_hairl.png" },
    head_hair_right: { src: "./texture_hairr.png" },
    head_face: { src: "./texture_face.png" },
    head_eyebrow_left: { src: "./texture_eyebrowl.png" },
    head_eyebrow_right: { src: "./texture_eyebrowr.png" },
    head_eyet0_left: { src: "./texture_eyet0l.png" },
    head_eyet0_right: { src: "./texture_eyet0r.png" },
    head_eyet1_left: { src: "./texture_eyet1l.png" },
    head_eyet1_right: { src: "./texture_eyet1r.png" },
    head_eyet2_left: { src: "./texture_eyet2l.png" },
    head_eyet2_right: { src: "./texture_eyet2r.png" },
    head_eyet3_left: { src: "./texture_eyet3l.png" },
    head_eyet3_right: { src: "./texture_eyet3r.png" },
    head_eyet4_left: { src: "./texture_eyet4l.png" },
    head_eyet4_right: { src: "./texture_eyet4r.png" },
    head_eyet5_left: { src: "./texture_eyet5l.png" },
    head_eyet5_right: { src: "./texture_eyet5r.png" },
    head_eyet6_left: { src: "./texture_eyet6l.png" },
    head_eyet6_right: { src: "./texture_eyet6r.png" },
    head_eyet7_left: { src: "./texture_eyet7l.png" },
    head_eyet7_right: { src: "./texture_eyet7r.png" },
    head_eyet8_left: { src: "./texture_eyet8l.png" },
    head_eyet8_right: { src: "./texture_eyet8r.png" },
    head_eyet9_left: { src: "./texture_eyet9.png" },
    head_eyet9_right: { src: "./texture_eyet9.png" },
    head_eye_a_left: { src: "./texture_eye_al.png" },
    head_eye_a_right: { src: "./texture_eye_ar.png" },
    head_eye_aa_left: { src: "./texture_eye_aal.png" },
    head_eye_aa_right: { src: "./texture_eye_aar.png" },
    head_facered_left: { src: "./texture_faceredl.png" },
    head_facered_right: { src: "./texture_faceredr.png" },
    head_faceredc_left: { src: "./texture_faceredcl.png" },
    head_faceredc_right: { src: "./texture_faceredcr.png" },
    head_mouth: { src: "./texture_mouth0.png" },
    head_mouth_a: { src: "./texture_mouth_a.png" },
    head_mouth_haha: { src: "./texture_mouth_haha.png" },
    head_mouth_bg: { src: "./texture_mouth_bg.png" },
    head_mouth_b: { src: "./texture_mouth_bg2.png" },
    head_mouth_tooth: { src: "./texture_mouth_tooth.png" },
    head_neck: { src: "./texture_neck.png" },
    body: { src: "./texture_body.png" },
    body_bottom: { src: "./texture_bodyb.png" },
    arm_left_top: { src: "./texture_armtl.png" },
    arm_left_bottom: { src: "./texture_armbl.png" },
    arm_right_top: { src: "./texture_armtr.png" },
    arm_right_bottom: { src: "./texture_armbr.png" },
    leg_left_top: { src: "./texture_legtl.png" },
    leg_left_bottom: { src: "./texture_legbl.png" },
    leg_right_top: { src: "./texture_legtr.png" },
    leg_right_bottom: { src: "./texture_legbr.png" },
}
Flat3D.Resource.loadTextureSet(Modle_Texture, function (cur, all) {
    document.getElementById("status").innerHTML = "Loading..." + cur + "/" + all;
    if (cur == all) {
        document.getElementById("status").innerHTML = "OK";
        init();
    }
});
var stage = new Flat3D.Stage();
function init() {
    var modle_move = { x: 0, y: 0 };
    var SCALE = 0.6;
    var ele = document.getElementById("StageCanvas");


    stage.setFPS(60);
    stage.tickSpeed = 1;
    stage.bindCanvas(ele, 600, 950);
    console.log(stage);
    //头部
    var m_head_hairb = new Flat3D.Thing(stage, new Flat3D.Point(0 + modle_move.x, 14 + modle_move.y, -5));
    m_head_hairb.texture.setImage(Modle_Texture.head_hair_background.image, true, function (thing, texture, image) {
        texture.transform.translate.y = -340;
    });
    /*var m_head_hair_ex0=new Flat3D.Thing(stage,new Flat3D.Point(0,344,-2));
    m_head_hair_ex0.texture.setImage(Modle_Texture.head_hair_ex0.image,true,function(thing,texture,image){
        texture.transform.translate.y=-image.height;
        texture.transform.translate.x+=24;
    });*/
    var m_head_f = new Flat3D.Contain.Container(stage, new Flat3D.Point(0 + modle_move.x, 14 + modle_move.y, 3));
    m_head_f.transform.translate.y = -340;
    var m_head_before = new Flat3D.Contain.Container(stage, new Flat3D.Point(0 + modle_move.x, 14 + modle_move.y, 5));
    m_head_before.transform.translate.y = -340;
    var m_head_hairt = new Flat3D.Contain.Thing(stage);

    var m_head_hair_ex1 = new Flat3D.Contain.Thing(stage);
    var m_head_hairl = new Flat3D.Contain.Thing(stage);
    var m_head_hairr = new Flat3D.Contain.Thing(stage);
    var m_head_face = new Flat3D.Contain.Thing(stage);
    var m_head_eyebrowl = new Flat3D.Contain.Thing(stage);
    var m_head_eyebrowr = new Flat3D.Contain.Thing(stage);
    var m_head_eyet0l = new Flat3D.Contain.Thing(stage);
    var m_head_eyet0r = new Flat3D.Contain.Thing(stage);
    var m_head_eyet1l = new Flat3D.Contain.Thing(stage);
    var m_head_eyet1r = new Flat3D.Contain.Thing(stage);
    var m_head_eyet2l = new Flat3D.Contain.Thing(stage);
    var m_head_eyet2r = new Flat3D.Contain.Thing(stage);
    var m_head_eyet3l = new Flat3D.Contain.Thing(stage);
    var m_head_eyet3r = new Flat3D.Contain.Thing(stage);
    var m_head_eyet4l = new Flat3D.Contain.Thing(stage);
    var m_head_eyet4r = new Flat3D.Contain.Thing(stage);
    var m_head_eyet5l = new Flat3D.Contain.Thing(stage);
    var m_head_eyet5r = new Flat3D.Contain.Thing(stage);
    var m_head_eyet6l = new Flat3D.Contain.Thing(stage);
    var m_head_eyet6r = new Flat3D.Contain.Thing(stage);
    var m_head_eyet7l = new Flat3D.Contain.Thing(stage);
    var m_head_eyet7r = new Flat3D.Contain.Thing(stage);
    var m_head_eyet8l = new Flat3D.Contain.Thing(stage);
    var m_head_eyet8r = new Flat3D.Contain.Thing(stage);
    var m_head_eyet9l = new Flat3D.Contain.Thing(stage);
    var m_head_eyet9r = new Flat3D.Contain.Thing(stage);
    var m_head_eye_al = new Flat3D.Contain.Thing(stage);
    var m_head_eye_ar = new Flat3D.Contain.Thing(stage);
    var m_head_eye_aal = new Flat3D.Contain.Thing(stage);
    var m_head_eye_aar = new Flat3D.Contain.Thing(stage);
    var m_head_faceredl = new Flat3D.Contain.Thing(stage);
    var m_head_faceredr = new Flat3D.Contain.Thing(stage);
    var m_head_faceredcl = new Flat3D.Contain.Thing(stage);
    var m_head_faceredcr = new Flat3D.Contain.Thing(stage);
    var m_head_mouth = new Flat3D.Contain.Thing(stage);
    var m_head_mouth_tooth = new Flat3D.Contain.Thing(stage);
    var m_head_mouth_bg = new Flat3D.Contain.Thing(stage);
    var m_head_mouth_b = new Flat3D.Contain.Thing(stage);
    var m_head_mouth_haha = new Flat3D.Contain.Thing(stage);
    var m_head_mouth_a = new Flat3D.Contain.Thing(stage);
    var m_head_hair_ex0 = new Flat3D.Contain.Thing(stage);
    m_head_hair_ex0.texture.setImage(Modle_Texture.head_hair_ex0.image, true, function (thing, texture, image) {
        texture.transform.translate.y = -image.height + 10;
        texture.transform.translate.x += 16;
    });
    m_head_hairt.texture.setImage(Modle_Texture.head_hair_top.image, true, function (thing, texture, image) {
        texture.transform.translate.y = 0;
        texture.transform.translate.x += 2;
    });

    m_head_hair_ex1.texture.setImage(Modle_Texture.head_hair_ex1.image, true, function (thing, texture, image) {
        texture.position.y = 200;
        texture.position.x = -160;
    });
    m_head_hairl.texture.setImage(Modle_Texture.head_hair_left.image, false, function (thing, texture, image) {
        texture.transform.translate.y = 30;
        texture.position.x = -image.width - 63;
    });
    m_head_hairr.texture.setImage(Modle_Texture.head_hair_right.image, false, function (thing, texture, image) {
        texture.transform.translate.y = 40;
        texture.position.x = 45;

    });
    m_head_face.texture.setImage(Modle_Texture.head_face.image, true, function (thing, texture, image) {
        texture.transform.translate.y = 22;
    });
    var m_neck = new Flat3D.Thing(stage, new Flat3D.Point(0 + modle_move.x, 16 + modle_move.y, 0));
    m_neck.texture.setImage(Modle_Texture.head_neck.image, true, function (thing, texture, image) {
        texture.transform.translate.x += 0;
        texture.transform.translate.y = 0;
    });
    m_head_eyebrowl.texture.setImage(Modle_Texture.head_eyebrow_left.image, true, function (thing, texture, image) {
        texture.position.y = 200;
        texture.position.x = -70;
        texture.transform.rotate.angle = 8;

    });
    m_head_eyebrowr.texture.setImage(Modle_Texture.head_eyebrow_right.image, true, function (thing, texture, image) {
        texture.position.y = 200;
        texture.position.x = 70;
        texture.transform.rotate.angle = -8;

    });
    m_head_eyet0l.texture.setImage(Modle_Texture.head_eyet0_left.image, true, function (thing, texture, image) {
        texture.position.y = 220;
        texture.position.x = -60;
    });
    m_head_eyet0r.texture.setImage(Modle_Texture.head_eyet0_right.image, true, function (thing, texture, image) {
        texture.position.y = 220;
        texture.position.x = 60;
    });
    m_head_eyet1l.texture.setImage(Modle_Texture.head_eyet1_left.image, true, function (thing, texture, image) {
        texture.position.y = 220;
        texture.position.x = -70;
    });
    m_head_eyet1r.texture.setImage(Modle_Texture.head_eyet1_right.image, true, function (thing, texture, image) {
        texture.position.y = 220;
        texture.position.x = 70;
    });
    m_head_eyet2l.texture.setImage(Modle_Texture.head_eyet2_left.image, true, function (thing, texture, image) {
        texture.position.y = 220;
        texture.position.x = -70;
    });
    m_head_eyet2r.texture.setImage(Modle_Texture.head_eyet2_right.image, true, function (thing, texture, image) {
        //texture.transform.translate.x+=10;
        texture.position.y = 220;
        texture.position.x = 70 + 14;
    });
    m_head_eyet3l.texture.setImage(Modle_Texture.head_eyet3_left.image, true, function (thing, texture, image) {
        texture.position.y = 245;
        texture.position.x = -75;
    });
    m_head_eyet3r.texture.setImage(Modle_Texture.head_eyet3_right.image, true, function (thing, texture, image) {
        texture.position.y = 245;
        texture.position.x = 75;
    });
    m_head_eyet4l.texture.setImage(Modle_Texture.head_eyet4_left.image, true, function (thing, texture, image) {
        texture.position.y = 275;
        texture.position.x = -70;
    });
    m_head_eyet4r.texture.setImage(Modle_Texture.head_eyet4_right.image, true, function (thing, texture, image) {
        texture.position.y = 275;
        texture.position.x = 70;
    });
    m_head_eyet5l.texture.setImage(Modle_Texture.head_eyet5_left.image, true, function (thing, texture, image) {
        texture.position.y = 275;
        texture.position.x = -110;
    });
    m_head_eyet5r.texture.setImage(Modle_Texture.head_eyet5_right.image, true, function (thing, texture, image) {
        texture.position.y = 275;
        texture.position.x = 110;
    });
    m_head_eyet6l.texture.setImage(Modle_Texture.head_eyet6_left.image, true, function (thing, texture, image) {
        texture.position.y = 316;
        texture.position.x = -75;
    });
    m_head_eyet6r.texture.setImage(Modle_Texture.head_eyet6_right.image, true, function (thing, texture, image) {
        texture.position.y = 316;
        texture.position.x = 75;
    });
    m_head_eyet7l.texture.setImage(Modle_Texture.head_eyet7_left.image, true, function (thing, texture, image) {
        texture.position.y = 322;
        texture.position.x = -70;
    });
    m_head_eyet7r.texture.setImage(Modle_Texture.head_eyet7_right.image, true, function (thing, texture, image) {
        texture.position.y = 322;
        texture.position.x = 70;
    });
    m_head_eyet8l.texture.setImage(Modle_Texture.head_eyet8_left.image, true, function (thing, texture, image) {
        texture.position.y = 280;
        texture.position.x = -70;
    });
    m_head_eyet8r.texture.setImage(Modle_Texture.head_eyet8_right.image, true, function (thing, texture, image) {
        texture.position.y = 280;
        texture.position.x = 70;
    });
    m_head_eyet9l.texture.setImage(Modle_Texture.head_eyet9_left.image, true, function (thing, texture, image) {
        texture.position.y = 265;
        texture.position.x = -90;
    });
    m_head_eyet9r.texture.setImage(Modle_Texture.head_eyet9_right.image, true, function (thing, texture, image) {
        texture.position.y = 265;
        texture.position.x = 50;
    });

    m_head_eye_al.texture.setImage(Modle_Texture.head_eye_a_left.image, true, function (thing, texture, image) {
        texture.position.y = 270;
        texture.position.x = -60;
        thing.visible = false;
    });
    m_head_eye_ar.texture.setImage(Modle_Texture.head_eye_a_right.image, true, function (thing, texture, image) {
        texture.position.y = 270;
        texture.position.x = 60;
        thing.visible = false;
    });

    m_head_eye_aal.texture.setImage(Modle_Texture.head_eye_aa_left.image, true, function (thing, texture, image) {
        texture.position.y = 275;
        texture.position.x = -60;
        thing.visible = false;
    });
    m_head_eye_aar.texture.setImage(Modle_Texture.head_eye_aa_right.image, true, function (thing, texture, image) {
        texture.position.y = 275;
        texture.position.x = 60;
        thing.visible = false;
    });

    m_head_faceredl.texture.setImage(Modle_Texture.head_facered_left.image, true, function (thing, texture, image) {
        texture.position.y = 328;
        texture.position.x = -90;
    });
    m_head_faceredr.texture.setImage(Modle_Texture.head_facered_right.image, true, function (thing, texture, image) {
        texture.position.y = 328;
        texture.position.x = 90;
    });
    m_head_faceredcl.texture.setImage(Modle_Texture.head_faceredc_left.image, true, function (thing, texture, image) {
        texture.position.y = 328;
        texture.position.x = -90;
        thing.visible = false;
    });
    m_head_faceredcr.texture.setImage(Modle_Texture.head_faceredc_right.image, true, function (thing, texture, image) {
        texture.position.y = 328;
        texture.position.x = 90;
        thing.visible = false;
    });
    m_head_mouth_bg.texture.setImage(Modle_Texture.head_mouth_bg.image, true, function (thing, texture, image) {
        texture.position.y = 318;
        thing.visible = false;
    });
    m_head_mouth_tooth.texture.setImage(Modle_Texture.head_mouth_tooth.image, true, function (thing, texture, image) {
        texture.position.y = 334;
        thing.visible = false;
    });
    m_head_mouth_b.texture.setImage(Modle_Texture.head_mouth_b.image, true, function (thing, texture, image) {
        texture.position.y = 355;
        thing.visible = false;
    });
    m_head_mouth.texture.setImage(Modle_Texture.head_mouth.image, true, function (thing, texture, image) {
        texture.position.y = 350;
    });
    m_head_mouth_haha.texture.setImage(Modle_Texture.head_mouth_haha.image, true, function (thing, texture, image) {
        texture.position.y = 346;
        thing.visible = false;
    });
    m_head_mouth_a.texture.setImage(Modle_Texture.head_mouth_a.image, true, function (thing, texture, image) {
        texture.position.y = 350;
        m_head_mouth_a.visible = false;
    });
    //左手
    var m_left_arm = new Flat3D.Contain.Container(stage, new Flat3D.Point(-56 + modle_move.x, -70 + modle_move.y, 0));
    var m_left_armb = new Flat3D.Contain.Thing(stage);
    var m_left_armt = new Flat3D.Contain.Thing(stage);
    m_left_armt.texture.setImage(Modle_Texture.arm_left_top.image, false, function (thing, texture, image) {
        m_left_armb.texture.position.y = (image.height - 32 - 20);
        texture.position.x += -72;
        texture.position.y += -20;
        texture.transform.rotate.center.x = 72;
        texture.transform.rotate.center.y = 20;
    });
    m_left_armb.texture.setImage(Modle_Texture.arm_left_bottom.image, false, function (thing, texture, image) {
        texture.position.x = (-image.width + 48 - 72);
        texture.transform.rotate.center.x = 85;
        texture.transform.rotate.center.y = 16;
    });
    //右手
    var m_right_arm = new Flat3D.Contain.Container(stage, new Flat3D.Point(56 + modle_move.x, -70 + modle_move.y, 0));
    var m_right_armb = new Flat3D.Contain.Thing(stage);
    var m_right_armt = new Flat3D.Contain.Thing(stage);
    m_right_armt.texture.setImage(Modle_Texture.arm_right_top.image, false, function (thing, texture, image) {
        m_right_armb.texture.position.y = (image.height - 32 - 20);
        texture.position.x += 72 - image.width;
        texture.position.y += -20;
        texture.transform.rotate.center.x = image.width - 72;
        texture.transform.rotate.center.y = 20;
    });
    m_right_armb.texture.setImage(Modle_Texture.arm_right_bottom.image, false, function (thing, texture, image) {
        texture.position.x = Modle_Texture.arm_right_top.image.width - 72;
        texture.transform.rotate.center.x = image.width - 85;
        texture.transform.rotate.center.y = 16;
    });

    //左脚
    var m_left_leg = new Flat3D.Contain.Container(stage, new Flat3D.Point(-56 + modle_move.x, -275 + modle_move.y, 0));
    var m_left_legb = new Flat3D.Contain.Thing(stage);
    var m_left_legt = new Flat3D.Contain.Thing(stage);
    m_left_legt.texture.setImage(Modle_Texture.leg_left_top.image, false, function (thing, texture, image) {
        m_left_legb.texture.position.y = (image.height - 44 - 30);
        texture.position.x += -40;
        texture.position.y += -30;
        texture.transform.rotate.center.x = 40;
        texture.transform.rotate.center.y = 30;
    });
    m_left_legb.texture.setImage(Modle_Texture.leg_left_bottom.image, false, function (thing, texture, image) {
        texture.position.x = (-image.width + 60 - 38);
        texture.transform.rotate.center.x = 38;
        texture.transform.rotate.center.y = 24;
    });
    //右脚
    var m_right_leg = new Flat3D.Contain.Container(stage, new Flat3D.Point(56 + modle_move.x, -275 + modle_move.y, 0));
    var m_right_legb = new Flat3D.Contain.Thing(stage);
    var m_right_legt = new Flat3D.Contain.Thing(stage);
    m_right_legt.texture.setImage(Modle_Texture.leg_right_top.image, false, function (thing, texture, image) {
        m_right_legb.texture.position.y = (image.height - 44 - 30);
        texture.position.x += 40 - image.width;
        texture.position.y += -30;
        texture.transform.rotate.center.x = image.width - 40;
        texture.transform.rotate.center.y = 30;
    });
    m_right_legb.texture.setImage(Modle_Texture.leg_right_bottom.image, false, function (thing, texture, image) {
        texture.position.x = Modle_Texture.leg_right_top.image.width - 60 - 38;
        texture.transform.rotate.center.x = image.width - 38;
        texture.transform.rotate.center.y = 24;
    });




    //上半身
    var m_body = new Flat3D.Thing(stage, new Flat3D.Point(0 + modle_move.x, -170 + modle_move.y, 2));
    m_body.texture.setImage(Modle_Texture.body.image, true, function (thing, texture, image) {
        texture.transform.translate.x += -5;
        texture.transform.translate.y -= 15;
    });
    //下半身
    var m_body_bottom = new Flat3D.Thing(stage, new Flat3D.Point(0 + modle_move.x, -250 + modle_move.y, 1));
    m_body_bottom.texture.setImage(Modle_Texture.body_bottom.image, true, function (thing, texture, image) {
        texture.transform.translate.x += -5;
        texture.transform.translate.y += 5;
    });

    m_body.click = function (e) {
        console.log("click body");
    }
    m_left_armt.click = function (e) {
        console.log("click arm_left_top");
    }
    m_left_armb.click = function (e) {
        console.log("click arm_left_bottom");
        wave();
    }
    m_right_armt.click = function (e) {
        console.log("click arm_right_top");
    }
    m_right_armb.click = function (e) {
        console.log("click arm_right_bottom");
        wave2();
    }
    m_right_legb.click = function (e) {
        console.log("click leg_right_bottom");
        jump();
    }
    m_left_legb.click = function (e) {
        console.log("click leg_left_bottom");
        jump();
    }
    m_head_face.click = function (e) {
        console.log("click face");
        smile();
    }
    m_head_eyet4l.click = function (e) {
        console.log("click eye left");
        blingEye();
    }
    m_head_eyet4r.click = function (e) {
        console.log("click eye right");
        blingEye();
    }
    m_head_hair_ex0.click = function (e) {
        console.log("click hair_dai!");
        daze();
    }
    m_head_hairt.click = function (e) {
        console.log("click hair_top!");
        cute();
    }

    stage.addThing(m_head_hairb);
    //stage.addThing(m_head_hair_ex0);
    stage.addThing(m_neck);



    m_left_arm.addThing(m_left_armt);
    m_left_arm.addThing(m_left_armb);
    stage.addThing(m_left_arm);
    m_right_arm.addThing(m_right_armt);
    m_right_arm.addThing(m_right_armb);
    stage.addThing(m_right_arm);


    m_left_leg.addThing(m_left_legb);
    m_left_leg.addThing(m_left_legt);
    stage.addThing(m_left_leg);

    m_right_leg.addThing(m_right_legb);
    m_right_leg.addThing(m_right_legt);
    stage.addThing(m_right_leg);

    stage.addThing(m_body_bottom);
    stage.addThing(m_body);


    m_head_f.addThing(m_head_face);

    m_head_f.addThing(m_head_eyet8l);
    m_head_f.addThing(m_head_eyet8r);
    m_head_f.addThing(m_head_eyet5l);
    m_head_f.addThing(m_head_eyet5r);
    m_head_f.addThing(m_head_eyet4l);
    m_head_f.addThing(m_head_eyet4r);
    m_head_f.addThing(m_head_eyet9l);
    m_head_f.addThing(m_head_eyet9r);


    m_head_f.addThing(m_head_eyet7l);
    m_head_f.addThing(m_head_eyet7r);

    m_head_f.addThing(m_head_eyet6l);
    m_head_f.addThing(m_head_eyet6r);




    m_head_f.addThing(m_head_eyet1l);
    m_head_f.addThing(m_head_eyet1r);
    m_head_f.addThing(m_head_eyet0l);
    m_head_f.addThing(m_head_eyet0r);
    m_head_f.addThing(m_head_eyebrowl);
    m_head_f.addThing(m_head_eyebrowr);
    m_head_f.addThing(m_head_eyet3l);
    m_head_f.addThing(m_head_eyet3r);
    m_head_f.addThing(m_head_eyet2l);
    m_head_f.addThing(m_head_eyet2r);

    m_head_f.addThing(m_head_eye_al);
    m_head_f.addThing(m_head_eye_ar);

    m_head_f.addThing(m_head_eye_aal);
    m_head_f.addThing(m_head_eye_aar);


    m_head_f.addThing(m_head_faceredl);
    m_head_f.addThing(m_head_faceredr);
    m_head_f.addThing(m_head_faceredcl);
    m_head_f.addThing(m_head_faceredcr);



    m_head_f.addThing(m_head_mouth_a);
    m_head_f.addThing(m_head_mouth_haha);
    m_head_f.addThing(m_head_mouth_tooth);
    m_head_f.addThing(m_head_mouth_b);
    m_head_f.addThing(m_head_mouth_bg);
    m_head_f.addThing(m_head_mouth);


    m_head_f.addThing(m_head_hair_ex0);

    stage.addThing(m_head_f);

    m_head_before.addThing(m_head_hairl);
    m_head_before.addThing(m_head_hairr);
    m_head_before.addThing(m_head_hairt);
    m_head_before.addThing(m_head_hair_ex1);
    stage.addThing(m_head_before);

    stage.start();
    ele.addEventListener("mousemove", function (e) {
        stage.camera.position.x = (e.offsetX - 300) * 0.25;
        stage.camera.position.y = (-e.offsetY + 500) * 0.25;
        var tan = stage.camera.position.x / stage.camera.position.z;
        var atan = Math.atan(tan) / Flat3D.Coordinate.PId180 + 180;
        stage.camera.angleA = atan;


    });
    //m_head_before.addFrameAnimationByParamKey("position.x",0,5,Flat3D.Ease.Quad.easeInOut,1000).start();

    function wave() {
        resetStatus();
        m_head_f.addFrameAnimationByParamKey("transform.rotate.angle", 0, 8, Flat3D.Ease.Quad.easeInOut, 1000, null, 1, false, true).start();
        m_head_before.addFrameAnimationByParamKey("transform.rotate.angle", 0, 8, Flat3D.Ease.Quad.easeInOut, 1000, null, 1, false, true).start();
        m_head_hairb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 8, Flat3D.Ease.Quad.easeInOut, 1000, null, 1, false, true).start();
        m_left_arm.addFrameAnimationByParamKey("transform.rotate.angle", 0, 40, Flat3D.Ease.Quad.easeInOut, 1000, null, 1, false, true).start();
        m_left_armb.addFrameAnimationByParamKey("texture.transform.rotate.angle", 0, 90, Flat3D.Ease.Quad.easeInOut, 1000, function () {
            m_left_armb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 60, Flat3D.Ease.Quad.easeInOut, 400, function () {
                m_left_arm.addFrameAnimationByParamKey("transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 800).start();
                m_left_armb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 800).start();
                m_left_legb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 500).start();
                m_left_leg.addFrameAnimationByParamKey("transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 500).start();
                m_head_f.addFrameAnimationByParamKey("transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 500).start();
                m_head_before.addFrameAnimationByParamKey("transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 500).start();
                m_head_hairb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 500).start();
            }, 1, true).start();
        }, 1, false, true).start();
        m_left_legb.addFrameAnimationByParamKey("texture.transform.rotate.angle", 0, 10, Flat3D.Ease.Quad.easeInOut, 500, null, 1, false, true).start();
        m_left_leg.addFrameAnimationByParamKey("transform.rotate.angle", 0, 5, Flat3D.Ease.Quad.easeInOut, 500, null, 1, false, true).start();
        eyeClose(2000);
    }
    function wave2() {
        resetStatus();
        m_head_f.addFrameAnimationByParamKey("transform.rotate.angle", null, 5, Flat3D.Ease.Quad.easeInOut, 300, function () {
            m_head_f.addFrameAnimationByParamKey("transform.rotate.angle", null, -5, Flat3D.Ease.Quad.easeInOut, 400, function () {
                m_head_f.addFrameAnimationByParamKey("transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 300, null, 1, false).start();
            }, 1, true).start();
        }, 1, false, true).start();
        m_head_before.addFrameAnimationByParamKey("transform.rotate.angle", null, 5, Flat3D.Ease.Quad.easeInOut, 300, function () {
            m_head_before.addFrameAnimationByParamKey("transform.rotate.angle", null, -5, Flat3D.Ease.Quad.easeInOut, 400, function () {
                m_head_before.addFrameAnimationByParamKey("transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 300, null, 1, false).start();
            }, 1, true).start();
        }, 1, false, true).start();
        m_head_hairb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 5, Flat3D.Ease.Quad.easeInOut, 300, function () {
            m_head_hairb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, -5, Flat3D.Ease.Quad.easeInOut, 400, function () {
                m_head_hairb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 300, null, 1, false).start();
            }, 1, true).start();
        }, 1, false, true).start();
        m_left_arm.addFrameAnimationByParamKey("transform.rotate.angle", 0, 16, Flat3D.Ease.Quad.easeInOut, 600, null, 2, true, true).start();
        m_right_arm.addFrameAnimationByParamKey("transform.rotate.angle", 0, -16, Flat3D.Ease.Quad.easeInOut, 600, null, 2, true, true).start();

    }
    function jump() {
        resetStatus();
        m_left_leg.addFrameAnimationByParamKey("transform.rotate.angle", null, -10, Flat3D.Ease.Quad.easeInOut, 600, null, 1, false, true).start();
        m_left_legb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 18, Flat3D.Ease.Quad.easeInOut, 600, null, 1, false, true).start();
        m_right_leg.addFrameAnimationByParamKey("transform.rotate.angle", null, 10, Flat3D.Ease.Quad.easeInOut, 600, null, 1, false, true).start();
        m_right_legb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, -18, Flat3D.Ease.Quad.easeInOut, 600, null, 1, false, true).start();
        setTimeout(function () {
            m_left_leg.addFrameAnimationByParamKey("transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 200).start();
            m_left_legb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 200).start();
            m_right_leg.addFrameAnimationByParamKey("transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 200).start();
            m_right_legb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 200).start();

        }, 600);
        m_left_arm.addFrameAnimationByParamKey("transform.rotate.angle", null, -8, Flat3D.Ease.Quad.easeIn, 800, function () {
            m_left_arm.addFrameAnimationByParamKey("transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 800).start();
        }, 1, false, true).start();
        m_right_arm.addFrameAnimationByParamKey("transform.rotate.angle", null, 8, Flat3D.Ease.Quad.easeIn, 800, function () {
            m_right_arm.addFrameAnimationByParamKey("transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 800).start();
        }, 1, false, true).start();
        var py = m_body.position.y;
        m_body.addFrameAnimationByParamKey("position.y", null, py - 20, Flat3D.Ease.Linear, 600, function () {
            m_body.addFrameAnimationByParamKey("position.y", null, py + 90, Flat3D.Ease.Quad.easeOut, 400, function () {
                m_body.addFrameAnimationByParamKey("position.y", null, py, Flat3D.Ease.Quad.easeIn, 400, function () {
                    m_head_hair_ex0.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 10, Flat3D.Ease.Quad.easeInOut, 300, function () {
                        m_head_hair_ex0.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, -10, Flat3D.Ease.Quad.easeInOut, 200, function () {
                            m_head_hair_ex0.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 300, null, 1, false).start();
                        }, 1, true).start();
                    }, 1, false, true).start();
                }).start();
            }).start();
        }, 1, false, true).start();

    }
    function blingEye() {
        resetStatus();
        eyeClose(100);
    }
    function smile() {
        resetStatus();
        eyeClose(1000);
    }
    function eyeClose(delay) {
        var templ = m_head_eyet3l.texture.transform.translate.y;
        m_head_eyet3l.addFrameAnimationByParamKey("texture.transform.translate.y", null, 15, Flat3D.Ease.Linear, 150, function () {
            setTimeout(function () {
                m_head_eyet3l.addFrameAnimationByParamKey("texture.transform.translate.y", null, templ, Flat3D.Ease.Linear, 200).start();
                m_head_eyet4l.addFrameAnimationByParamKey("opacity", 0.8, 1, Flat3D.Ease.Expo.easeOut, 100, null, 1, false).start();
                m_head_eyet5l.addFrameAnimationByParamKey("opacity", 0.8, 1, Flat3D.Ease.Expo.easeOut, 100, null, 1, false).start();
                m_head_eyet6l.addFrameAnimationByParamKey("opacity", 0.8, 1, Flat3D.Ease.Expo.easeOut, 100, null, 1, false).start();
                m_head_eyet7l.addFrameAnimationByParamKey("opacity", 0.8, 1, Flat3D.Ease.Expo.easeOut, 100, null, 1, false).start();
                m_head_eyet8l.addFrameAnimationByParamKey("opacity", 0.8, 1, Flat3D.Ease.Expo.easeOut, 50, null, 1, false).start();
            }, delay);
        }, 1, false, true).start();
        m_head_eyet4l.addFrameAnimationByParamKey("opacity", null, 0, Flat3D.Ease.Expo.easeIn, 100, null, 1, false, true).start();
        m_head_eyet5l.addFrameAnimationByParamKey("opacity", null, 0, Flat3D.Ease.Expo.easeIn, 100, null, 1, false, true).start();
        m_head_eyet6l.addFrameAnimationByParamKey("opacity", null, 0, Flat3D.Ease.Expo.easeIn, 100, null, 1, false, true).start();
        m_head_eyet7l.addFrameAnimationByParamKey("opacity", null, 0, Flat3D.Ease.Expo.easeIn, 100, null, 1, false, true).start();
        m_head_eyet8l.addFrameAnimationByParamKey("opacity", null, 0, Flat3D.Ease.Expo.easeIn, 50, null, 1, false, true).start();
        var tempr = m_head_eyet3r.texture.transform.translate.y;
        m_head_eyet3r.addFrameAnimationByParamKey("texture.transform.translate.y", null, 15, Flat3D.Ease.Linear, 150, function () {
            setTimeout(function () {
                m_head_eyet3r.addFrameAnimationByParamKey("texture.transform.translate.y", null, templ, Flat3D.Ease.Linear, 200).start();
                m_head_eyet4r.addFrameAnimationByParamKey("opacity", 0.8, 1, Flat3D.Ease.Expo.easeOut, 100, null, 1, false).start();
                m_head_eyet5r.addFrameAnimationByParamKey("opacity", 0.8, 1, Flat3D.Ease.Expo.easeOut, 100, null, 1, false).start();
                m_head_eyet6r.addFrameAnimationByParamKey("opacity", 0.8, 1, Flat3D.Ease.Expo.easeOut, 100, null, 1, false).start();
                m_head_eyet7r.addFrameAnimationByParamKey("opacity", 0.8, 1, Flat3D.Ease.Expo.easeOut, 100, null, 1, false).start();
                m_head_eyet8r.addFrameAnimationByParamKey("opacity", 0.8, 1, Flat3D.Ease.Expo.easeOut, 50, null, 1, false).start();
            }, delay);
        }, 1, false, true).start();
        m_head_eyet4r.addFrameAnimationByParamKey("opacity", null, 0, Flat3D.Ease.Expo.easeIn, 100, null, 1, false, true).start();
        m_head_eyet5r.addFrameAnimationByParamKey("opacity", null, 0, Flat3D.Ease.Expo.easeIn, 100, null, 1, false, true).start();
        m_head_eyet6r.addFrameAnimationByParamKey("opacity", null, 0, Flat3D.Ease.Expo.easeIn, 100, null, 1, false, true).start();
        m_head_eyet7r.addFrameAnimationByParamKey("opacity", null, 0, Flat3D.Ease.Expo.easeIn, 100, null, 1, false, true).start();
        m_head_eyet8r.addFrameAnimationByParamKey("opacity", null, 0, Flat3D.Ease.Expo.easeIn, 50, null, 1, false, true).start();
    }
    function mouthOpen(delay) {
        m_head_mouth_tooth.visible = true;
        m_head_mouth_haha.visible = true;
        m_head_mouth_b.visible = true;
        m_head_mouth_bg.visible = true;
        var temp = m_head_mouth_b.texture.transform.translate.y;
        m_head_mouth.addFrameAnimationByParamKey("opacity", null, 0, Flat3D.Ease.Quad.easeInOut, 120, null, 1, false, true).start();
        m_head_mouth_haha.addFrameAnimationByParamKey("opacity", 0, 1, Flat3D.Ease.Quad.easeInOut, 100, null, 1, false, true).start();
        m_head_mouth_tooth.addFrameAnimationByParamKey("opacity", 0, 1, Flat3D.Ease.Quad.easeInOut, 100, null, 1, false, true).start();
        m_head_mouth_b.addFrameAnimationByParamKey("texture.transform.translate.y", null, -3, Flat3D.Ease.Quad.easeInOut, 120, function () {
            setTimeout(function () {
                m_head_mouth_haha.addFrameAnimationByParamKey("opacity", 1, 0, Flat3D.Ease.Quad.easeInOut, 60).start();
                m_head_mouth_tooth.addFrameAnimationByParamKey("opacity", 1, 0, Flat3D.Ease.Quad.easeInOut, 60).start();
                m_head_mouth.addFrameAnimationByParamKey("opacity", 0.4, 1, Flat3D.Ease.Quad.easeInOut, 80).start();
                m_head_mouth_b.addFrameAnimationByParamKey("texture.transform.translate.y", null, temp, Flat3D.Ease.Quad.easeInOut, 100, function () {
                    m_head_mouth_haha.visible = false;
                    m_head_mouth_tooth.visible = false;
                    m_head_mouth_b.visible = false;
                    m_head_mouth_bg.visible = false;
                }).start();
            }, delay - 80);
        }, 1, false, true).start();

    }
    function laugh() {
        resetStatus();
        eyeClose(1000);
        mouthOpen(1000);
    }
    function daze() {
        resetStatus();
        m_head_hair_ex0.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 10, Flat3D.Ease.Quad.easeInOut, 300, function () {
            m_head_hair_ex0.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, -10, Flat3D.Ease.Quad.easeInOut, 200, function () {
                m_head_hair_ex0.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 300, null, 1, false).start();
            }, 2, true).start();
        }, 1, false, true).start();
        m_head_f.addFrameAnimationByParamKey("transform.rotate.angle", 0, -5, Flat3D.Ease.Quad.easeInOut, 600, null, 1, false, true).start();
        m_head_before.addFrameAnimationByParamKey("transform.rotate.angle", 0, -5, Flat3D.Ease.Quad.easeInOut, 600, null, 1, false, true).start();
        m_head_hairb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, -5, Flat3D.Ease.Quad.easeInOut, 600, null, 1, false, true).start();
        m_head_mouth.visible = false;
        m_head_eye_al.visible = true;
        m_head_eye_ar.visible = true;
        m_head_mouth_a.visible = true;
        setTimeout(function () {
            m_head_f.addFrameAnimationByParamKey("transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 600).start();
            m_head_before.addFrameAnimationByParamKey("transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 600).start();
            m_head_hairb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 0, Flat3D.Ease.Quad.easeInOut, 600).start();
            m_head_eye_al.visible = false;
            m_head_eye_ar.visible = false;
            m_head_mouth_a.visible = false;
            m_head_mouth.visible = true;
        }, 2000);
    }

    function cute() {
        resetStatus();
        m_head_mouth.visible = false;
        m_head_eye_aal.visible = true;
        m_head_eye_aar.visible = true;
        m_head_faceredcl.visible = true;
        m_head_faceredcr.visible = true;
        m_head_f.addFrameAnimationByParamKey("transform.rotate.angle", null, 5, Flat3D.Ease.Quad.easeInOut, 800, null, 1, true, true).start();
        m_head_before.addFrameAnimationByParamKey("transform.rotate.angle", null, 5, Flat3D.Ease.Quad.easeInOut, 800, null, 1, true, true).start();
        m_head_hairb.addFrameAnimationByParamKey("texture.transform.rotate.angle", null, 5, Flat3D.Ease.Quad.easeInOut, 800, null, 1, true, true).start();
        mouthOpen(2000);
        setTimeout(function () {
            m_head_eye_aal.visible = false;
            m_head_eye_aar.visible = false;
            m_head_mouth.visible = true;
            m_head_faceredcl.visible = false;
            m_head_faceredcr.visible = false;
        }, 2000);
    }
    function resetStatus() {
        stage.destroyAllAnimation();
        m_head_mouth.visible = true;
        m_head_eye_al.visible = false;
        m_head_eye_ar.visible = false;
        m_head_mouth_a.visible = false;
        m_head_eye_aal.visible = false;
        m_head_eye_aar.visible = false;
        m_head_faceredcl.visible = false;
        m_head_faceredcr.visible = false;
        m_head_mouth_haha.visible = false;
        m_head_mouth_tooth.visible = false;
        m_head_mouth_b.visible = false;
        m_head_mouth_bg.visible = false;
    }
    document.getElementById("start").addEventListener("click", function () {
        stage.start();
    });
    document.getElementById("pause").addEventListener("click", function () {
        stage.pause();
    });
    document.getElementById("wave").addEventListener("click", function () {
        wave();
    });
    document.getElementById("wave2").addEventListener("click", function () {
        wave2();
    });
    document.getElementById("jump").addEventListener("click", function () {
        jump();
    });
    document.getElementById("blingeye").addEventListener("click", function () {
        blingEye();
    });
    document.getElementById("smile").addEventListener("click", function () {
        smile();
    });
    document.getElementById("daze").addEventListener("click", function () {
        daze();
    });
    document.getElementById("laugh").addEventListener("click", function () {
        laugh();
    });
    document.getElementById("cute").addEventListener("click", function () {
        cute();
    });

    var bodyControl = new Flat3D.InfluenceSet(m_body, "position.y");
    bodyControl.addListener(function (thing, before, after) {
        var d = after - before;
        m_body_bottom.position.y += d;
        m_head_before.position.y += d;
        m_head_hairb.position.y += d;
        m_head_f.position.y += d;
        m_neck.position.y += d;
        m_left_arm.position.y += d;
        m_right_arm.position.y += d;
        m_left_leg.position.y += d;
        m_right_leg.position.y += d;
    });

    var eyeControlLeft = new Flat3D.InfluenceSet(m_head_eyet3l, "texture.transform.translate.y");
    eyeControlLeft.addListener(function (thing, before, after) {
        var d = after - before;
        m_head_eyet1l.texture.transform.translate.y += d;
        m_head_eyet2l.texture.transform.translate.y += d;
        m_head_eyebrowl.texture.transform.translate.y += d / 12;
        m_head_eyet0l.texture.transform.translate.y += d / 5;
        m_head_eyet5l.texture.transform.translate.y += d / 3;
        m_head_eyet7l.texture.transform.translate.y -= d / 3;
        m_head_eyet6l.texture.transform.translate.y -= d / 3;
    });

    var eyeControlRight = new Flat3D.InfluenceSet(m_head_eyet3r, "texture.transform.translate.y");
    eyeControlRight.addListener(function (thing, before, after) {
        var d = after - before;
        m_head_eyet1r.texture.transform.translate.y += d;
        m_head_eyet2r.texture.transform.translate.y += d;
        m_head_eyebrowr.texture.transform.translate.y += d / 12;
        m_head_eyet0r.texture.transform.translate.y += d / 5;
        m_head_eyet5r.texture.transform.translate.y += d / 3;
        m_head_eyet7r.texture.transform.translate.y -= d / 3;
        m_head_eyet6r.texture.transform.translate.y -= d / 3;
    });

    var mouthControl = new Flat3D.InfluenceSet(m_head_mouth_b, "texture.transform.translate.y");
    mouthControl.addListener(function (thing, before, after) {
        var d = after - before;
        m_head_mouth_bg.texture.transform.translate.y -= d;
    });
}
document.getElementById("debug").addEventListener("click", function () {
    Flat3D.Config.DEBUG_MODE = !Flat3D.Config.DEBUG_MODE;
});