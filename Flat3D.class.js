/*Flat 3D Alpha 1.0 created by Jarvis 2017.01.03*/
"use strict";
var Flat3D = {
    Stage: function () {
        var stage = {
            stageThings: [],
            stageCamera: new Flat3D.Camera(new Flat3D.Point(0, 0, 0), 0,90, 100),
            stageTickStatus: 2,
            stageTick: 0,
            stageTickSpeed: 1,
            stageCenter: new Flat3D.Point(0, 0, 0),
            stageCanvas: undefined,
            bindCanvas: function (canvasElement, width, height) {
                canvasElement.width = width;
                canvasElement.height = height;
                this.stageCenter = new Flat3D.Point(width / 2, height / 2, 0);
                this.stageCamera = new Flat3D.Camera(new Flat3D.Point(0, 0, 100), 0,90, 100);
                this.stageCanvas = canvasElement.getContext("2d");
            },
            setThing: function (thing) {
                var newThings = [];
                for (var a = 0; a < this.stageThings.length; a++) {
                    if (this.stageThings[a]) {
                        newThings.push(this.stageThings[a]);
                    }
                }
                this.stageThings = newThings;
                this.stageThings.push(thing);
                return thing;
            },
            removeThing: function (thing) {
                var id = this.stageThings.indexOf(thing);
                if (id > -1) {
                    this.stageThings[id].destroy();
                    this.stageThings[id] = undefined;
                }
            },
            start: function () {
                this.stageTickStatus = 1;
            },
            pause: function () {
                this.stageTickStatus = 0;
            },
            destroy: function () {
                this.stageTickStatus = 2;
                if (this.timer) clearInterval(this.timer);
                for (var a = 0; a < this.stageThings.length; a++) {
                    this.stageThings[a].destroy();
                }
            },
        };
        stage.timer = setInterval(function () {
            if (stage.status == 1) {
                stage.stageTick += stage.stageTickSpeed;
            }
        }, 1);
        return stage;
    },
    Camera: function (centerPoint, angleA,angleB, focus) {
        return {
            angleA:angleA,
            angleB:angleB,
            position: centerPoint,
            focus: focus,
            setAngle: function (_angleA,_angleB) {
                this.angleA = _angleA;
                this.angleB = _angleB;
            },
            setPosition: function (_centerPoint) {
                this.position = _centerPoint;
            },
            setFocus: function (_focus) {
                this.focus = _focus;
            },
        };
    },
    Point: function (x, y, z) {
        var point = {
            x: x, y: y, z: z,
            to: function (target) {
                return new Flat3D.Vector(target.x - this.x, target.y - this.y, target.z - this.z);
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

            };
        }
    },
    Thing: function (stage, position, rect) {
        var thing = {
            stage: stage,
            canvasRect: rect,
            position: position,
            effectCallBack: function (fromThing) { },
            effectSet: [],
            animations: [],
            notifyEffectSet: function () {
                var n = this.effectSet.length;
                for (var a = 0; a < n; a++) {
                    if (this.effectSet[a] && this.effectSet[a].effectCallBack) this.effectSet[a].effectCallBack(this);
                }
            },
            setFrameAnimationByParamKey: function (paramKey, start, end, valueEaseFunc, dtime, completedCallBack) {
                var ani = new Flat3D.Animation.FrameParamKey(this, paramKey, start, end, valueEaseFunc, dtime, completedCallBack);
                return this.setAnimation(ani);
            },
            setFrameAnimationByParamsFunc: function (paramsFunc, dtime, completedCallBack) {
                var ani = new Flat3D.Animation.FrameParamsFunc(this, paramsFunc, dtime, completedCallBack);
                return this.setAnimation(ani);
            },
            /*setForceAnimationByParamsFunc: function (paramsFunc, dtime, completedCallBack) {
                var ani = new Flat3D.Animation.ForceParamsFunc(this, paramsFunc, dtime, completedCallBack);
                return this.setAnimation(ani);
            },*/
            setAnimation: function (ani) {
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
            }
        };
        return this;
    },
    Coordinate:{
        PId180:Math.PI/180,
        point3DTo2D:function(point,camera){
            var temp;
            var temp_position = new Array(3);
            var k = 0;
            var twDimsPos = {};
            var CeyeVector=function (eyeView) {//返回视角向量[x轴,y轴,z轴]
                var r = 1, a, b, eyeVector = new Array(3);
                a = 180+eyeView[0];
                b = 180-eyeView[1];
                eyeVector[2] = Flat3D.Coordinate.sphrToRect(a, b, r);
                a = 270 + eyeView[0];
                b = 90;
                eyeVector[0] = Flat3D.Coordinate.sphrToRect(a, b, r);
                a = 180 + eyeView[0];
                b = 90-eyeView[1];
                eyeVector[1] = Flat3D.Coordinate.sphrToRect(a, b, r);
                return eyeVector;
            };
            var eyeVector = CeyeVector([camera.angleA,camera.angleB]);
            temp=camera.position.to(point);
            temp_position[0] = temp.x * eyeVector[0].x + temp.y * eyeVector[0].y + temp.z * eyeVector[0].z;
            temp_position[1] = temp.x * eyeVector[1].x + temp.y * eyeVector[1].y + temp.z * eyeVector[1].z;
            temp_position[2] = temp.x * eyeVector[2].x + temp.y * eyeVector[2].y + temp.z * eyeVector[2].z;
            twDimsPos.position2D = {};
            k = -camera.focus / temp_position[2];
            twDimsPos.position2D.x = k * k * temp_position[0];
            twDimsPos.position2D.y = -k * k * temp_position[1];
            twDimsPos.deep = temp_position[2];
            twDimsPos.k = k;
            return twDimsPos;
        },
        sphrToRect:function(angleA, angleB, r){
            var radA=angleA * Flat3D.Coordinate.PId180;
            var radB=angleB * Flat3D.Coordinate.PId180;
            var a = r * Math.sin(radB) * Math.cos(radA);
            var b = r * Math.sin(radB) * Math.sin(radA);
            var c = r * Math.cos(radB);
            return new Flat3D.Vector(b,c,a);
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
    },
    Animation: {
        FrameParamsFunc: function (target, paramsFunc, dtime, _completedCallBack) {
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
                }
            };
            ani.timer = setInterval(function () {
                if (ani.status == 1 && ani.thing.stage.stageTickStatus == 1) {
                    if (ani.tick > ani.finalTick) {
                        if (ani.completedCallBack) ani.completedCallBack(ani.thing);
                        ani.stop();
                    }
                    ani.tick += ani.thing.stage.stageTickSpeed;
                    var keys = Object.keys(ani.effectParams);
                    for (var a = 0; a < keys.length; a++) {
                        var value = Flat3D.Value.getValue(ani.thing, keys[a]);
                        value = ani.effectParams[keys[a]](value);
                        Flat3D.Value.setValue(ani.thing, keys[a], value)
                    }
                }
            }, 1);
            return ani;
        },
        FrameParamKey: function (target, paramKey, startValue, endValue, valueEaseFunc, dtime, _completedCallBack) {
            var ani = {
                status: 2,
                finalTick: dtime,
                tick: 0,
                timer: undefined,
                thing: target,
                completedCallBack: _completedCallBack,
                effectParamKey: paramKey,
                easeFunc: valueEaseFunc,
                start: function () {
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
                },
                _ease: {
                    d: 0, start: startValue, end: endValue
                }
            };
            ani.timer = setInterval(function () {
                if (ani.status == 1 && ani.thing.stage.stageTickStatus == 1) {
                    if (ani.tick > ani.finalTick) {
                        if (ani.completedCallBack) ani.completedCallBack(ani.thing);
                        ani.stop();
                    }
                    ani.tick += ani.thing.stage.stageTickSpeed;
                    var value = Flat3D.Value.getValue(ani.thing, ani.effectParamKey);
                    if (ani.easeFunc) {
                        value = ani.easeFunc(ani.tick, ani._ease.start, ani._ease.d, ani.finalTick);
                        if ((value - ani._ease.end) * ani._ease.vd > 0) {
                            value = ani._ease.end;
                            ani.stop();
                        }
                        Flat3D.Value.setValue(ani.thing, ani.effectParamKey, value);
                        console.log(value);
                    }
                }
            }, 1);
            return ani;
        }
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
                var d = this.distance();
                return new Flat3D.Vector(this.x / d, this.y / d, this.z / d);
            },
            /**
             * 获取向量距离（大小）
             */
            distance: function () {
                return Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2), 0.5);
            },
            /**
             * 返回数组格式坐标
             */
            array: function () {
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
    EaseFunc: {
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
                return c - Flat3D.EaseFunc.Bounce.easeOut(d - t, 0, c, d) + b;
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
                if (t < d / 2) return Flat3D.EaseFunc.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                else return Flat3D.EaseFunc.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
};

