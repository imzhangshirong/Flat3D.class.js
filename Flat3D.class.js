/*Flat 3D Alpha 1.0 created by Jarvis 2017.01.03*/
"use strict";
var Flat3D = {
    Config: {
        TIMER_TICK: 20,
        DEBUG_MODE: false,
    },
    Stage: function () {
        var stage = {
            things: [],
            camera: new Flat3D.Camera(new Flat3D.Point(0, 0, 0), 0, 90, 1000),
            status: 2,
            tick: 0,
            rect: undefined,
            tickSpeed: 1,
            canvas: undefined,
            canvasBuffer: undefined,
            matrix: undefined,
            updateDuration: 16,//60 fps
            _lastUpdate: 0,
            bindCanvas: function (canvasElement, width, height) {
                canvasElement.width = width;
                canvasElement.height = height;
                var buffer = document.createElement("canvas");
                buffer.width = width;
                buffer.height = height;
                this.canvasBuffer = buffer.getContext("2d");
                canvasElement.addEventListener("click", function (e) {
                    stage.updateMatrix();
                    if (stage.matrix[e.offsetX][e.offsetY] && stage.matrix[e.offsetX][e.offsetY].belong) {
                        stage.matrix[e.offsetX][e.offsetY].belong.click(e);
                    }
                }, false);
                this.rect = new Flat3D.Rect.createFromSizeCenter(0, 0, width, height);
                this.camera = new Flat3D.Camera(new Flat3D.Point(0, 0, 1000), 180, 90, 1000);
                this.canvas = canvasElement.getContext("2d");
                //console.log(this.rect);
                this.canvas.translate(-this.rect.left, -this.rect.top);
                this.canvasBuffer.translate(-this.rect.left, -this.rect.top);
                this.updateStage();
            },
            addThing: function (thing) {
                var newThings = [];
                for (var a = 0; a < this.things.length; a++) {
                    if (this.things[a]) {
                        newThings.push(this.things[a]);
                    }
                }
                this.things = newThings;
                this.things.push(thing);
                return thing;
            },
            removeThing: function (thing) {
                var id = this.things.indexOf(thing);
                if (id > -1) {
                    this.things[id].destroy();
                    this.things[id] = undefined;
                }
            },
            start: function () {
                this.status = 1;
            },
            pause: function () {
                this.status = 0;
            },
            destroy: function () {
                this.status = 2;
                if (this.timer) clearInterval(this.timer);
                for (var a = 0; a < this.things.length; a++) {
                    this.things[a].destroy();
                }
            },
            updateStage: function () {
                if (this.canvas) {
                    this.canvas.clearRect(this.rect.left, this.rect.top, this.rect.width, this.rect.height);
                    for (var a = 0; a < this.things.length; a++) {
                        this.things[a].draw();
                    }
                    //var bufferData=this.canvasBuffer.getImageData(0,0,this.rect.width,this.rect.height)
                    //this.canvas.putImageData(bufferData,0,0);
                    //bufferData=null;
                }

                //console.log(stage.tick);
            },
            updateMatrix: function () {
                if (this.canvas) {
                    this.matrix = new Flat3D.Matrix(this.rect.width, this.rect.height);
                    for (var a = 0; a < this.things.length; a++) {
                        this.things[a].updateMatrix();
                    }
                }
            },
            setFPS: function (FPS) {
                this.updateDuration = 1000 / FPS;
            },
            destroyAllAnimation: function () {
                for (var a = 0; a < this.things.length; a++) {
                    this.things[a].destroyAllAnimation(true);
                }
            }
        };
        stage.timer = setInterval(function () {
            if (stage.status == 1) {
                stage.tick += stage.tickSpeed * Flat3D.Config.TIMER_TICK;
            }
            if (stage.tick - stage._lastUpdate >= stage.updateDuration) {
                stage._lastUpdate = stage.tick;
                stage.updateStage();
            }
        }, Flat3D.Config.TIMER_TICK);
        return stage;
    },
    Matrix: function (width, height) {
        var data = [];
        for (var a = 0; a < width; a++) {
            data[a] = [];
        }
        return data;
    },
    Camera: function (centerPoint, angleA, angleB, focus) {
        return {
            angleA: angleA,
            angleB: angleB,
            position: centerPoint,
            focus: focus
        };
    },
    Point: function (x, y, z) {
        var point = {
            x: x, y: y, z: z,
            to: function (target) {
                return new Flat3D.Vector(target.x - this.x, target.y - this.y, target.z - this.z);
            },
            add: function (target) {
                return new Flat3D.Point(target.x + this.x, target.y + this.y, target.z + this.z);
            },
            sub: function (target) {
                return new Flat3D.Point(-target.x + this.x, -target.y + this.y, -target.z + this.z);
            }
        };
        return point;
    },
    Rect: {
        createFromSizeCenter: function (centerLeft, centerTop, width, height) {
            return Flat3D.Rect.create(centerLeft - width / 2, centerTop - height / 2, centerLeft + width / 2, centerTop + height / 2);
        },
        createFromSize: function (left, top, width, height) {
            return Flat3D.Rect.create(left, top, left + width, top + height);
        },
        create: function (left, top, right, bottom) {
            return {
                left: left, top: top, right: right, bottom: bottom,
                width: right - left, height: bottom - top,
                in: function (x, y) {
                    if (x >= this.left && x <= this.right && y >= this.top && y <= this.bottom) return true;
                    return false;
                }

            };
        }
    },
    Resource: {
        loadTextureSet: function (textureSet, process) {
            if (textureSet) {
                var keys = Object.keys(textureSet);
                var loaded = 0;
                for (var a = 0; a < keys.length; a++) {
                    textureSet[keys[a]].image = new Image();
                    textureSet[keys[a]].image.src = textureSet[keys[a]].src;
                    textureSet[keys[a]].image.onload = function () {
                        loaded++;
                        if (process) {
                            process(loaded, keys.length);
                        }
                    }
                }
            }
        }
    },
    Contain: {
        Container: function (stage, position) {
            var container = new Flat3D.Thing(stage, position);
            container.texture = undefined;
            container.things = [];
            container.addThing = function (thing) {
                thing.container = this;
                var newThings = [];
                for (var a = 0; a < this.things.length; a++) {
                    if (this.things[a]) {
                        newThings.push(this.things[a]);
                    }
                }
                this.things = newThings;
                this.things.push(thing);
                return thing;
            };
            container.removeThing = function (thing) {
                var id = this.things.indexOf(thing);
                if (id > -1) {
                    this.things[id].destroy();
                    this.things[id] = undefined;
                }
            };
            container._2dCoordinate = Flat3D.Coordinate.point3DTo2D(position, stage.camera);
            container.transform = {
                translate: {
                    x: 0,
                    y: 0
                },
                scale: {
                    scaleWidth: 1,
                    scaleHeight: 1
                },
                rotate: {
                    center: {
                        x: 0,
                        y: 0
                    },
                    angle: 0
                }
            };
            container.draw = function () {
                if(!this.visible)return;
                this._2dCoordinate = Flat3D.Coordinate.point3DTo2D(this.position, this.stage.camera);
                for (var a = 0; a < this.things.length; a++) {
                    if (this.things[a]) {
                        this.things[a].draw();
                    }
                }
            };
            container.updateMatrix = function () {
                for (var a = 0; a < this.things.length; a++) {
                    if (this.things[a]) {
                        this.things[a].updateMatrix();
                    }
                }
            };
            container.destroy = function () {
                for (var a = 0; a < this.things.length; a++) {
                    this.things[a].destroy();
                }
            };
            container.destroyAllAnimation = function (containAllThing) {
                if (containAllThing) {
                    for (var a = 0; a < this.things.length; a++) {
                        this.things[a].destroyAllAnimation();
                    }
                }
                for (var a = 0; a < this.animations.length; a++) {
                    this.animations[a].destroy();
                }
                this.animations = [];
            }
            return container;
        },
        Thing: function (stage) {
            var thing = new Flat3D.Thing(stage);
            delete thing.position;
            return thing;
        }
    },
    Texture: function (thing, url, moveToCenter, loadComplete) {
        var texture = {
            imageCanDraw: false,
            image: undefined,
            thing: thing,
            position: {
                x: 0,
                y: 0
            },
            transform: new Flat3D.Transform(),
            setImage: function (image, moveToCenter, loadComplete) {
                this.image = image;
                if (image.width && image.width > 0) {
                    this.imageCanDraw = true;
                    if (moveToCenter) {
                        this.transform.translate = {
                            x: -image.width / 2,
                            y: -image.height / 2,
                        }
                    }
                    if (loadComplete) loadComplete(this.thing, this, this.image);
                }
            },
            setImageURL: function (url, moveToCenter, loadComplete) {
                var thing = this.thing;
                var image = new Image();
                image.src = url;
                texture.imageCanDraw = false;
                image.onload = function () {
                    texture.imageCanDraw = true;
                    if (moveToCenter) {
                        texture.transform.translate = {
                            x: -this.width / 2,
                            y: -this.height / 2,
                        }
                    }
                    if (loadComplete) loadComplete(thing, texture, this);
                }
                this.image = image;
                return this.image;
            },
        };
        if (arguments.length > 1) {
            texture.setImage(url, moveToCenter, loadComplete);
        }
        return texture;
    },
    Transform: function () {
        return {
            translate: {
                x: 0,
                y: 0
            },
            scale: {
                scaleWidth: 1,
                scaleHeight: 1
            },
            rotate: {
                center: {
                    x: 0,
                    y: 0
                },
                angle: 0
            }
        };
    },
    Thing: function (stage, position) {
        var thing = {
            stage: stage,
            position: position,
            rect: undefined,
            visible:true,
            opacity:1,
            animations: [],
            click: function (e) { },
            draw: function (getArea) {
                var trans = new Flat3D.Transform();
                if (this.visible && this.texture && this.texture.image && this.texture.imageCanDraw && this.stage.canvas) {
                    var canvas = this.stage.canvas;
                    if (getArea) {
                        canvas = this.stage.canvasBuffer;
                    }
                    if (this.container) {
                        trans = this.container.transform;
                    }
                    var scale = {
                        scaleWidth: this.texture.transform.scale.scaleWidth,
                        scaleHeight: this.texture.transform.scale.scaleHeight,
                    };
                    var x = this.texture.transform.translate.x - this.texture.transform.rotate.center.x;//相对旋转中心有位移
                    var y = this.texture.transform.translate.y - this.texture.transform.rotate.center.y;
                    var rotate = {
                        x: this.texture.position.x + this.texture.transform.rotate.center.x,
                        y: this.texture.position.y + this.texture.transform.rotate.center.y,
                        angle: this.texture.transform.rotate.angle * Flat3D.Coordinate.PId180
                    };
                    var cRotate = { x: 0, y: 0, angle: 0 };
                    var cx = 0;
                    var cy = 0;
                    if (this.container) {
                        cx = this.container.transform.translate.x - this.container.transform.rotate.center.x;
                        cy = this.container.transform.translate.y - this.container.transform.rotate.center.y;
                        cRotate = {
                            x: this.container._2dCoordinate.position2D.x + this.container.transform.rotate.center.x,
                            y: -this.container._2dCoordinate.position2D.y + this.container.transform.rotate.center.y,
                            angle: this.container.transform.rotate.angle * Flat3D.Coordinate.PId180
                        }
                        //cx /= trans.scale.scaleWidth;
                        //cy /= trans.scale.scaleHeight;
                        //cRotate.x/= trans.scale.scaleWidth;
                        //cRotate.y /= trans.scale.scaleHeight;
                        canvas.globalAlpha=this.container.opacity;
                        canvas.scale(trans.scale.scaleWidth, trans.scale.scaleHeight);
                        canvas.translate(cRotate.x, cRotate.y);
                        canvas.rotate(cRotate.angle);
                        canvas.translate(cx, cy);
                        //x /= scale.scaleWidth;
                        //y /= scale.scaleHeight;
                        //rotate.x /= scale.scaleWidth;
                        //rotate.y /= scale.scaleHeight;
                        if (Flat3D.Config.DEBUG_MODE) {
                            // 标记原点
                            canvas.beginPath();
                            canvas.arc(0, 0, 8, 0, Math.PI * 2);
                            canvas.fillStyle = "rgba(255,0,0,0.4)";
                            canvas.fill();
                        }

                    }
                    else {

                        var cTrans = Flat3D.Coordinate.point3DTo2D(this.position, this.stage.camera);
                        if (Flat3D.Config.DEBUG_MODE) {
                            // 标记原点
                            canvas.beginPath();
                            canvas.arc(cTrans.position2D.x, -cTrans.position2D.y, 8, 0, Math.PI * 2);
                            canvas.fillStyle = "rgba(255,0,0,0.4)";
                            canvas.fill();
                        }
                        rotate.x += cTrans.position2D.x;
                        rotate.y += -cTrans.position2D.y;
                    }
                    canvas.scale(scale.scaleWidth, scale.scaleHeight);
                    canvas.translate(rotate.x, rotate.y);
                    canvas.rotate(rotate.angle);
                    canvas.globalAlpha*=this.opacity;                    
                    canvas.drawImage(this.texture.image, x, y);
                    canvas.globalAlpha=1;    
                    if (Flat3D.Config.DEBUG_MODE) {
                        // 标记thing旋转中心
                        canvas.beginPath();
                        canvas.arc(0, 0, 4, 0, Math.PI * 2);
                        canvas.fillStyle = "blue";
                        canvas.fill();
                    }
                    canvas.rotate(-rotate.angle);
                    canvas.translate(-rotate.x, -rotate.y);
                    canvas.scale(1 / scale.scaleWidth, 1 / scale.scaleHeight);
                    if (this.container) {
                        canvas.translate(-cx, -cy);
                        if (Flat3D.Config.DEBUG_MODE) {
                            // 标记container旋转中心
                            canvas.beginPath();
                            canvas.arc(0, 0, 4, 0, Math.PI * 2);
                            canvas.fillStyle = "green";
                            canvas.fill();
                        }

                        canvas.rotate(-cRotate.angle);
                        canvas.translate(-cRotate.x, -cRotate.y);
                        canvas.scale(1 / trans.scale.scaleWidth, 1 / trans.scale.scaleHeight);
                    }
                    //开始进行区域计算
                    if (!this.texture.image) return;
                    var areaPoint = [{ x: x, y: y }, { x: x + this.texture.image.width, y: y }, { x: x + this.texture.image.width, y: y + this.texture.image.height }, { x: x, y: y + this.texture.image.height }];
                    var ttD, tan, atan, tcD;
                    for (var a = 0; a < areaPoint.length; a++) {
                        x = areaPoint[a].x;
                        y = areaPoint[a].y;
                        ttD = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
                        if (x == 0) x = 0.00000001;
                        tan = -y / x;
                        atan = 0;
                        if (x < 0) atan += 180;
                        atan = atan * Flat3D.Coordinate.PId180 + Math.atan(tan) - rotate.angle;
                        x = (ttD * Math.cos(atan) + rotate.x) * scale.scaleWidth + cx;
                        y = (-ttD * Math.sin(atan) + rotate.y) * scale.scaleHeight + cy;
                        if (this.container) {
                            tcD = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
                            if (x == 0) x = 0.00000001;
                            tan = -y / x;
                            atan = 0;
                            if (x < 0) atan += 180;
                            atan = atan * Flat3D.Coordinate.PId180 + Math.atan(tan) - cRotate.angle;
                            x = (tcD * Math.cos(atan) + cRotate.x) * trans.scale.scaleWidth;
                            y = (-tcD * Math.sin(atan) + cRotate.y) * trans.scale.scaleHeight;
                        }
                        areaPoint[a].x = x;
                        areaPoint[a].y = y;
                        if (Flat3D.Config.DEBUG_MODE) {
                            //区域标记
                            canvas.beginPath();
                            canvas.arc(x, y, 2, 0, Math.PI * 2);
                            canvas.fillStyle = "red";
                            canvas.fill();
                        }


                    }
                    var area = [areaPoint[0].x, areaPoint[0].y, areaPoint[0].x, areaPoint[0].y];
                    for (var a = 1; a < areaPoint.length; a++) {
                        if (areaPoint[a].x < area[0]) area[0] = areaPoint[a].x;
                        if (areaPoint[a].x > area[2]) area[2] = areaPoint[a].x;
                        if (areaPoint[a].y < area[1]) area[1] = areaPoint[a].y;
                        if (areaPoint[a].y > area[3]) area[3] = areaPoint[a].y;
                    }
                    area = new Flat3D.Rect.create(area[0], area[1], area[2], area[3]);
                    this.rect = area;

                    if (Flat3D.Config.DEBUG_MODE) {
                        //区域标记
                        canvas.strokeStyle = "rgba(0,255,0,0.5)";
                        canvas.strokeRect(area.left, area.top, area.width, area.height);
                    }


                }
            },
            updateMatrix: function () {
                //更新区域矩阵
                //return 0;
                if (!this.stage.canvasBuffer) return;
                this.stage.canvasBuffer.clearRect(this.stage.rect.left, this.stage.rect.top, this.stage.rect.width, this.stage.rect.height);
                if(!this.visible)return;
                this.draw(true);
                
                var colorData = this.stage.canvasBuffer.getImageData(0, 0, this.stage.rect.width, this.stage.rect.height);
                var x, y, area = new Flat3D.Rect.create(Math.floor(this.rect.left), Math.floor(this.rect.top), Math.floor(this.rect.right), Math.floor(this.rect.bottom)), left = -Math.floor(this.stage.rect.left), top = -Math.floor(this.stage.rect.top);
                /*区域矩形
                this.stage.canvas.strokeStyle = "green";
                this.stage.canvas.strokeRect(area.left, area.top, area.width, area.height);
                */
                //this.stage.canvas.fillStyle="rgba(255,255,0,0.4)";
                var x = area.left + left, y = 0;
                for (var a = area.left; a <= area.right; a++ && x++) {
                    y = area.top + top;
                    for (var b = area.top; b <= area.bottom; b++ && y++) {
                        //x = a + left;
                        //y = b + top;
                        if (x > -1 && y > -1 && x < this.stage.rect.width && y < this.stage.rect.height && this.stage.rect.in(a, b)) {
                            var color = Flat3D.Value.getStageColor(colorData, x, y);
                            if (color.alpha > 0) {
                                color.belong = this;
                                this.stage.matrix[x][y] = color;
                                /*非空区域
                                this.stage.canvas.beginPath();
                                this.stage.canvas.arc(a, b, 1, 0, Math.PI * 2);
                                this.stage.canvas.fill();
                                */
                            }
                        }
                    }
                }
                colorData = null;
            },
            setTexture: function (texture) {
                this.texture = texture;
            },
            addFrameAnimationByParamKey: function (paramKey, start, end, valueEase, dtime, completedCallBack, repeat, yoyo, recover) {
                var ani = new Flat3D.Animation.FrameByParamKey(this, paramKey, start, end, valueEase, dtime, completedCallBack, repeat, yoyo, recover);
                return this.addAnimation(ani);
            },
            addFrameAnimationByParamsFunc: function (paramsFunc, dtime, completedCallBack, repeat, yoyo) {
                var ani = new Flat3D.Animation.FrameByParamsFunc(this, paramsFunc, dtime, completedCallBack, repeat, yoyo);
                return this.addAnimation(ani);
            },
            /*addForceAnimationByParamsFunc: function (paramsFunc, dtime, completedCallBack) {
                var ani = new Flat3D.Animation.ForceParamsFunc(this, paramsFunc, dtime, completedCallBack);
                return this.addAnimation(ani);
            },*/
            addAnimation: function (ani) {
                var newAnis = [];
                for (var a = 0; a < this.animations.length; a++) {
                    if (this.animations[a]) {
                        newAnis.push(this.animations[a]);
                    }
                }
                this.animations = newAnis;
                this.animations.push(ani);
                return ani;
            },
            removeAnimation: function (ani) {
                var id = this.animations.indexOf(ani);
                if (id > -1) {
                    this.animations[id].destroy();
                    this.animations[id] = undefined;
                }
            },
            destroy: function () {
                for (var a = 0; a < this.animations.length; a++) {
                    this.animations[a].destroy();
                }
            },
            destroyAllAnimation: function () {
                for (var a = 0; a < this.animations.length; a++) {
                    this.animations[a].destroy();
                }
                this.animations = [];
            }
        };
        thing.texture= new Flat3D.Texture(thing);
        return thing;
        
    },
    Coordinate: {
        PId180: Math.PI / 180,
        point3DTo2D: function (point, camera) {
            var temp;
            var temp_position = new Array(3);
            var k = 0;
            var twDimsPos = {};
            var CeyeVector = function (eyeView) {//返回视角向量[x轴,y轴,z轴]
                var r = 1, a, b, eyeVector = new Array(3);
                a = 180 + eyeView[0];
                b = 180 - eyeView[1];
                eyeVector[2] = Flat3D.Coordinate.sphrToRect(a, b, r);
                a = 270 + eyeView[0];
                b = 90;
                eyeVector[0] = Flat3D.Coordinate.sphrToRect(a, b, r);
                a = 180 + eyeView[0];
                b = 90 - eyeView[1];
                eyeVector[1] = Flat3D.Coordinate.sphrToRect(a, b, r);
                return eyeVector;
            };
            var eyeVector = CeyeVector([camera.angleA, camera.angleB]);
            temp = camera.position.to(point);
            temp_position[0] = temp.x * eyeVector[0].x + temp.y * eyeVector[0].y + temp.z * eyeVector[0].z;
            temp_position[1] = temp.x * eyeVector[1].x + temp.y * eyeVector[1].y + temp.z * eyeVector[1].z;
            temp_position[2] = temp.x * eyeVector[2].x + temp.y * eyeVector[2].y + temp.z * eyeVector[2].z;
            twDimsPos.position2D = {};
            k = -camera.focus / temp_position[2];
            var k2 = Math.pow(k, 2);
            twDimsPos.position2D.x = k2 * temp_position[0];
            twDimsPos.position2D.y = k2 * temp_position[1];
            twDimsPos.deep = temp_position[2];
            twDimsPos.k = k;
            return twDimsPos;
        },
        sphrToRect: function (angleA, angleB, r) {
            var radA = angleA * Flat3D.Coordinate.PId180;
            var radB = angleB * Flat3D.Coordinate.PId180;
            var a = r * Math.sin(radB) * Math.cos(radA);
            var b = r * Math.sin(radB) * Math.sin(radA);
            var c = r * Math.cos(radB);
            return new Flat3D.Vector(b, c, a);
        }
    },
    Value: {
        getValue: function (obj, key) {
            var keys = key.split(".");
            var value = obj;
            if (keys.length > 0) {
                for (var a = 0; a < keys.length; a++) {
                    value = value[keys[a]];
                }
            }
            else {
                value = obj[key];
            }
            return value;
        },
        setValue: function (obj, key, newValue) {
            var keys = key.split(".");
            var value = obj;
            if (keys.length > 0) {
                var a;
                for (a = 0; a < keys.length - 1; a++) {
                    value = value[keys[a]];
                }
                value[keys[a]] = newValue;
            }
            else {
                value = newValue;
            }
        },
        getStageColor: function (colorData, x, y) {
            var data = colorData;
            var i = (data.width * y + x) * 4;
            var color = {
                red: data.data[i],
                green: data.data[i + 1],
                blue: data.data[i + 2],
                alpha: data.data[i + 3],
            };
            return color;
        }
    },
    Animation: {
        FrameByParamsFunc: function (target, paramsFunc, dtime, _completedCallBack, repeat, yoyo) {
            var ani = {
                status: 2,
                finalTick: dtime,
                tick: 0,
                timer: undefined,
                thing: target,
                completedCallBack: _completedCallBack,
                effectParamsFunc: paramsFunc,
                start: function () {
                    this.status = 1;
                },
                pause: function () {
                    this.status = 0;
                },
                stop: function () {
                    this.status = 2;
                },
                resetTick: function () {
                    this.tick = 0;
                },
                tickCallBack: function () { },
                setTick: function (ticks) {
                    this.timer = ticks;
                },
                destroy: function () {
                    this.stop();
                    if (this.timer) clearInterval(this.timer);
                },
                isYoyo: yoyo ? true : false,
                _completeTimes: 0,
                _runDirection: 1,
                repeatTimes: repeat ? repeat : 1,
            };
            ani.timer = setInterval(function () {
                if (ani.status == 1 && ani.thing.stage.status == 1) {
                    if (ani.tick >= ani.finalTick) {
                        ani._completeTimes++;
                        if (ani.completedCallBack) ani.completedCallBack(ani.thing);
                        ani.stop();
                        if (ani._completeTimes < ani.repeatTimes) {
                            if (!ani.isYoyo) {
                                ani.resetTick();
                                ani.start();
                            }
                            else {
                                ani._runDirection = -1;
                                ani.start();
                            }
                        }
                    }
                    else {
                        ani.tick += ani.thing.stage.tickSpeed * Flat3D.Config.TIMER_TICK * ani._runDirection;
                        if (ani.tick > ani.finalTick) ani.tick = ani.finalTick;
                        if (ani.tick <= 0) {
                            ani.tick = 0;
                            ani._runDirection = 1;
                        }
                        var keys = Object.keys(ani.effectParams);
                        for (var a = 0; a < keys.length; a++) {
                            var value = Flat3D.Value.getValue(ani.thing, keys[a]);
                            value = ani.effectParams[keys[a]](value, ani);
                            Flat3D.Value.setValue(ani.thing, keys[a], value);
                        }
                    }
                }
            }, Flat3D.Config.TIMER_TICK);
            return ani;
        },
        FrameByParamKey: function (target, paramKey, startValue, endValue, valueEase, dtime, _completedCallBack, repeat, yoyo, recover) {
            var ani = {
                status: 2,
                finalTick: dtime,
                tick: 0,
                timer: undefined,
                thing: target,
                completedCallBack: _completedCallBack,
                effectParamKey: paramKey,
                ease: valueEase,
                start: function () {
                    if(this.tick==0)Flat3D.Value.setValue(this.thing, this.effectParamKey, this._ease.start);
                    this._ease.d = this._ease.end - this._ease.start;
                    this.status = 1;
                },
                pause: function () {
                    this.status = 0;
                },
                stop: function () {
                    this.status = 2;
                },
                resetTick: function () {
                    this.tick = 0;
                },
                tickCallBack: function () { },
                setTick: function (ticks) {
                    this.timer = ticks;
                },
                destroy: function () {
                    this.stop();
                    if (this.timer) clearInterval(this.timer);
                    if (this.canRecover) Flat3D.Value.setValue(this.thing, this.effectParamKey, this._recoverValue);
                },
                _ease: {
                    d: 0,
                    start: (startValue != null) ? startValue : Flat3D.Value.getValue(target, paramKey),
                    end: (endValue != null) ? endValue : Flat3D.Value.getValue(target, paramKey)
                },
                isYoyo: yoyo ? true : false,
                _completeTimes: 0,
                _runDirection: 1,
                _recoverValue: (startValue != null) ? startValue : Flat3D.Value.getValue(target, paramKey),
                canRecover: recover,
                repeatTimes: repeat ? repeat : 1,
            };
            ani.timer = setInterval(function () {
                if (ani.status == 1 && ani.thing.stage.status == 1) {
                    if (ani.tick >= ani.finalTick) {
                        ani._completeTimes++;
                        ani.stop();
                        if (!ani.isYoyo) {
                            if (ani.completedCallBack) ani.completedCallBack(ani.thing);
                            if (ani._completeTimes < ani.repeatTimes) {
                                ani.resetTick();
                                ani.start();
                            }
                        }
                        else {
                            if (ani._runDirection == 1) {
                                ani._runDirection = -1;
                                ani.tick--;
                                ani.start();
                            
                            }

                        }


                    }
                    else {
                        ani.tick += ani.thing.stage.tickSpeed * Flat3D.Config.TIMER_TICK * ani._runDirection;
                        if (ani.tick > ani.finalTick) ani.tick = ani.finalTick;
                        if (ani.tick <= 0) {
                            ani.tick = 0;
                            if (ani._runDirection == -1 && ani.isYoyo && ani._completeTimes >= ani.repeatTimes) {
                                if (ani.completedCallBack) ani.completedCallBack(ani.thing);
                            }
                            ani._runDirection = 1;
                            if (ani._completeTimes < ani.repeatTimes) {
                                ani.resetTick();
                                ani.start();
                            }
                            else {
                                ani.stop();
                            }
                        }
                        var value = Flat3D.Value.getValue(ani.thing, ani.effectParamKey);
                        if (ani.ease) {
                            value = ani.ease(ani.tick, ani._ease.start, ani._ease.d, ani.finalTick);
                            if ((value - ani._ease.end) * ani._ease.vd > 0) {
                                value = ani._ease.end;
                                ani.stop();
                            }
                            Flat3D.Value.setValue(ani.thing, ani.effectParamKey, value);
                        }
                    }
                }
            }, Flat3D.Config.TIMER_TICK);
            return ani;
        }
    },
    InfluenceSet: function (parentThing, effectSourceKey) {
        var keys = effectSourceKey.split(".");
        var key = effectSourceKey;
        var value = parentThing;
        if (keys.length > 0) {
            for (var a = 0; a < keys.length - 1; a++) {
                value = value[keys[a]];
            }
            key = keys[keys.length - 1];
        }
        var influenceSet = {
            listeners: [],
            thing: parentThing,
            lastDate: {
                before: value[key], after: value[key]
            },
            removeListener: function (listener) {
                var id = this.listeners.indexOf(listener);
                if (id > -1) {
                    this.listeners[id] = undefined;
                }
            },
            notify: function (before, after) {
                this.lastDate = { before: before, after: after };
                for (var a = 0; a < this.listeners.length; a++) {
                    if (this.listeners[a]) {
                        this.listeners[a](parentThing, before, after);
                    }
                }
            }
        };
        influenceSet.addListener = function (listener) {
            var newListeners = [];
            for (var a = 0; a < this.listeners.length; a++) {
                if (this.listeners[a]) {
                    newListeners.push(this.listeners[a]);
                }
            }
            this.listeners = newListeners;
            this.listeners.push(listener);
            listener(parentThing, this.lastDate.before, this.lastDate.after);
            return listener;
        };
        var newSpace=value[key];
        Object.defineProperty(value, key, {
            set: function (data) {
                var before = newSpace;
                newSpace = data;
                influenceSet.notify(before,data);
            },
            get: function () {return newSpace;}
        });
        return influenceSet;
    },
    Path: {},
    Vector: function (_x, _y, _z) {
        return {
            x: _x,
            y: _y,
            z: _z,
            /**
             * 单位化向量
             */
            unit: function () {
                var d = this.getDistance();
                return new Flat3D.Vector(this.x / d, this.y / d, this.z / d);
            },
            /**
             * 获取向量距离（大小）
             */
            getDistance: function () {
                return Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2), 0.5);
            },
            /**
             * 返回数组格式坐标
             */
            getArray: function () {
                return [this.x, this.y, this.z];
            }
        };
    },
    /**
     * 动画算法部分，参考自Tween
     *  t--- current time（当前时间）；
        b--- beginning value（初始值）；
        c--- change in value（变化量）；
        d--- duration（持续时间）
     */
    Ease: {
        Linear: function (t, b, c, d) { return c * t / d + b; },
        Quad: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        Quint: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        Sine: {
            easeIn: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        Expo: {
            easeIn: function (t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function (t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Elastic: {
            easeIn: function (t, b, c, d, a, p) {
                if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function (t, b, c, d, a, p) {
                if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function (t, b, c, d, a, p) {
                if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        },
        Back: {
            easeIn: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        Bounce: {
            easeIn: function (t, b, c, d) {
                return c - Flat3D.Ease.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function (t, b, c, d) {
                if (t < d / 2) return Flat3D.Ease.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                else return Flat3D.Ease.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
};

