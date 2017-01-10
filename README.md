# Flat3D.class.js
## 一个由平面组成的3D视差舞台，全Canvas绘制

## 类说明：
### 1. Flat3D.Config：配置
- Flat3D.Config.TIMER_TICK：时钟周期，默认20

### 2. Flat3D.Stage：舞台类
- Flat3D.Stage()
- Flat3D.Stage.status > int
- Flat3D.Stage.camera > Flat3D.Stage.Camera
- Flat3D.Stage.things > [] > Flat3D.Thing,Flat3D.Contain.Container
- Flat3D.Stage.tick > float
- Flat3D.Stage.tickSpeed > float
- Flat3D.Stage.rect > Flat3D.Stage.Rect
- Flat3D.Stage.canvas > canvasElement.getContext("2d")
- Flat3D.Stage.canvasBuffer > canvasElement.getContext("2d")
- Flat3D.Stage.matrix > Flat3D.Stage.Matrix
- Flat3D.Stage.updateDuration > float
- Flat3D.Stage.bindCanvas(canvasElement, width, height)
- Flat3D.Stage.setThing(thing)
- Flat3D.Stage.removeThing(thing)
- Flat3D.Stage.start()
- Flat3D.Stage.pause()
- Flat3D.Stage.destroy()
- Flat3D.Stage.setFPS(FPS)
- Flat3D.Stage.updateStage()
- Flat3D.Stage.updateMatrix()

### 3. Flat3D.Camera：舞台相机类
- Flat3D.Camera(centerPoint, angleA, angleB, focus)
- Flat3D.Camera.angleA > float
- Flat3D.Camera.angleB > float
- Flat3D.Camera.focus > float
- Flat3D.Camera.position > Flat3D.Point

### 4. Flat3D.Thing：物体类
- Flat3D.Thing()
- Flat3D.Thing.stage > Flat3D.Stage
- Flat3D.Thing.position > Flat3D.Point
- Flat3D.Thing.effectCallBack
- Flat3D.Thing.effectSet
- Flat3D.Thing.rect > Flat3D.Rect
- Flat3D.Thing.animations > Flat3D.Animation
- Flat3D.Thing.click > function(event){}
- Flat3D.Thing.texture > Flat3D.Texture
- Flat3D.Thing.draw()
- Flat3D.Thing.updateMatrix()
- Flat3D.Thing.setTexture()
- Flat3D.Thing.notifyEffectSet()
- Flat3D.Thing.setFrameAnimationByParamKey()
- Flat3D.Thing.setFrameAnimationByParamsFunc()
- Flat3D.Thing.setAnimation()
- Flat3D.Thing.removeAnimation()
- Flat3D.Thing.destroy()

### 5. Flat3D.Contain.Container：容器类，父类：Flat3D.Thing
- Flat3D.Contain.Container()

### 6. Flat3D.Contain.Thing：容器物体类，父类：Flat3D.Thing
- Flat3D.Contain.Thing()

### 7. Flat3D.Texture：物体贴图类
- Flat3D.Texture(thing[, url, moveToCenter, loadComplete])
- Flat3D.Texture.thing > Flat3D.Thing,Flat3D.Contain.Thing
- Flat3D.Texture.imageCanDraw > boolean
- Flat3D.Texture.image > Image
- Flat3D.Texture.position > {x:float, y:float}
- Flat3D.Texture.transform > Flat3D.Tranform
- Flat3D.Texture.setImage(url[, moveToCenter, loadComplete])


### 8. Flat3D.Transform：变换类
- Flat3D.Transform()
- Flat3D.Transform.translate > {x:float, y:float}
- Flat3D.Transform.scale > {scaleWidth:float, scaleHeight:float}
- Flat3D.Transform.rotate > {center:{x:float, y:float}, angle:float}

### 9. Flat3D.Animation.FrameByParamsFunc：动画(自定义方法处理，{"变量":function(value,ani){//..}})类
- Flat3D.Animation.FrameByParamsFunc()
- Flat3D.Animation.FrameByParamsFunc.thing
- Flat3D.Animation.FrameByParamsFunc.status
- Flat3D.Animation.FrameByParamsFunc.tick
- Flat3D.Animation.FrameByParamsFunc.finalTick
- Flat3D.Animation.FrameByParamsFunc.completedCallBack
- Flat3D.Animation.FrameByParamsFunc.effectParamsFunc
- Flat3D.Animation.FrameByParamsFunc.start()
- Flat3D.Animation.FrameByParamsFunc.pause()
- Flat3D.Animation.FrameByParamsFunc.stop()
- Flat3D.Animation.FrameByParamsFunc.setTick()
- Flat3D.Animation.FrameByParamsFunc.resetTick()
- Flat3D.Animation.FrameByParamsFunc.tickCallBack
- Flat3D.Animation.FrameByParamsFunc.timer
- Flat3D.Animation.FrameByParamsFunc.destroy()

### 10. Flat3D.Animation.FrameByParamKey：动画(预设缓动处理)类
- Flat3D.Animation.FrameByParamKey()
- Flat3D.Animation.FrameByParamKey.thing
- Flat3D.Animation.FrameByParamKey.status
- Flat3D.Animation.FrameByParamKey.tick
- Flat3D.Animation.FrameByParamKey.finalTick
- Flat3D.Animation.FrameByParamKey.completedCallBack
- Flat3D.Animation.FrameByParamKey.effectParamKey
- Flat3D.Animation.FrameByParamKey.ease
- Flat3D.Animation.FrameByParamKey.start()
- Flat3D.Animation.FrameByParamKey.pause()
- Flat3D.Animation.FrameByParamKey.stop()
- Flat3D.Animation.FrameByParamKey.setTick()
- Flat3D.Animation.FrameByParamKey.resetTick()
- Flat3D.Animation.FrameByParamKey.tickCallBack
- Flat3D.Animation.FrameByParamKey.timer
- Flat3D.Animation.FrameByParamKey.destroy()

### 11. Flat3D.Coordinate：坐标转换类
- Flat3D.Coordinate.PId180 > PI/180
- Flat3D.Coordinate.point3DTo2D(point, camera)
- Flat3D.Coordinate.sphrToRect(angleA, angleB, r)

### 12. Flat3D.Value：赋值取值类
- Flat3D.Value.getValue(obj, key)
- Flat3D.Value.setValue(obj, key, newValue)
- Flat3D.Value.getStageColor(colorData, x, y)


### 13. Flat3D.Point：三维坐标类
- Flat3D.Point(x,y,z)
- Flat3D.Point.x
- Flat3D.Point.y
- Flat3D.Point.z
- Flat3D.Point.to(target)
- Flat3D.Point.add(target)
- Flat3D.Point.sub(target)

### 14. Flat3D.Vector：三维向量类
- Flat3D.Vector
- Flat3D.Vector.x
- Flat3D.Vector.y
- Flat3D.Vector.z
- Flat3D.Vector.unit
- Flat3D.Vector.getDistance
- Flat3D.Vector.getArray

### 15. Flat3D.Rect：二维矩形类
- Flat3D.Rect.create(left, top, right, bottom)
- Flat3D.Rect.createFromSize(left, top, width, height)
- Flat3D.Rect.createFromSizeCenter(centerLeft, centerTop, width, height)


### 16. Flat3D.Matrix：舞台点矩阵类
- Flat3D.Matrix(width, height)

### 17. Flat3D.Ease：动画缓动类
- Flat3D.Ease.Linear(t, b, c, d)
- Flat3D.Ease.Quad.easeIn/easeOut/easeInOut(t, b, c, d)
- Flat3D.Ease.Cubic.easeIn/easeOut/easeInOut(t, b, c, d)
- Flat3D.Ease.Quart.easeIn/easeOut/easeInOut(t, b, c, d)
- Flat3D.Ease.Quint.easeIn/easeOut/easeInOut(t, b, c, d)
- Flat3D.Ease.Sine.easeIn/easeOut/easeInOut(t, b, c, d)
- Flat3D.Ease.Expo.easeIn/easeOut/easeInOut(t, b, c, d)
- Flat3D.Ease.Circ.easeIn/easeOut/easeInOut(t, b, c, d)
- Flat3D.Ease.Elastic.easeIn/easeOut/easeInOut(t, b, c, d)
- Flat3D.Ease.Back.easeIn/easeOut/easeInOut(t, b, c, d)
- Flat3D.Ease.Bounce.easeIn/easeOut/easeInOut(t, b, c, d)