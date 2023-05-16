const defaultOpts = {
  canvasId: 'canvas',
  width: 300,
  height: 200,
  bgImg: '',
  maskColor: '#edce94',
  size: 15,
  showPercent: 0.2, // 刮开多少比例之后展开全部
  scale: 0.5,
  startCallBack: () => void {},
  overCallBack: () => void {}
}
export class Scratch {
  height: number;
  canvasId: string;
  width: number;
  bgImg: any;
  maskColor: string;
  size: number;
  radius: number;
  area: number;
  showPercent: number;
  scale: number;
  startCallBack?: () => void;
  totalArea: number;
  overCallBack?:() => void;
  show = false;
  clearPoints = [];
  ctx?: CanvasRenderingContext2D
  canvas?: HTMLCanvasElement;

  constructor(opts: typeof defaultOpts){
    opts = opts || {};
    this.canvasId = opts.canvasId || 'canvas';
    this.width = opts.width || 300;
    this.height = opts.height || 300;
    this.bgImg = opts.bgImg || ''; //覆盖的图片
    this.maskColor = opts.maskColor || '#edce94';
    this.size = opts.size || 15,
    this.radius = this.size;
    this.area = this.radius * this.radius;
    this.showPercent = opts.showPercent || 0.2; //刮开多少比例显示全部
    this.scale = opts.scale || 0.5;
    this.totalArea = this.width * this.height;
    this.startCallBack = opts.startCallBack; //第一次刮时触发刮奖效果
    this.overCallBack = opts.overCallBack; //刮奖完触发
    this.init();
  }

  init() {
    this.clearPoints = [];
    window.aa
    const node = document.getElementById(this.canvasId) as HTMLCanvasElement
    if(node){
      this.canvas = node;
      this.ctx = this.canvas.getContext('2d') || undefined;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
    this.drawMask();
    // self.bindTouch();
  }
  // 遮罩层
  async drawMask() {
    if(this.ctx){
      this.ctx.fillStyle = this.maskColor;
    }
    this.ctx?.fillRect(0, 0, this.width, this.height);
 }

//  bindTouch() {
//   this.touchStart = (e) => {
//      this.eraser(e, true);
//   }
//   this.page.touchMove = (e) => {
//      this.eraser(e, false);
//   }
//   this.page.touchEnd = (e) => {
//       if (this.show) {
//           //this.page.clearCanvas();
//           if (this.overCallBack) this.overCallBack();
//           this.ctx.clearRect(0, 0, this.width * this.rpx, this.height * this.rpx);
//           //this.ctx.draw();
//       }
//     }
//   }

//   eraser(e, bool) {
//     let len = this.clearPoints.length;
//     let count = 0;
//     let x = e.touches[0].x,
//        y = e.touches[0].y;
//     let x1 = x - this.size;
//     let y1 = y - this.size;
//     if (bool) {
//        this.clearPoints.push({
//           x1: x1,
//           y1: y1,
//           x2: x1 + this.r,
//           y2: y1 + this.r
//        })
//     }
//     for (let item of this.clearPoints) {
//        if (item.x1 > x || item.y1 > y || item.x2 < x || item.y2 < y) {
//           count++;
//        } else {
//           break;
//        }
//     }
//     if (len === count) {
//        this.clearPoints.push({
//           x1: x1,
//           y1: y1,
//           x2: x1 + this.r,
//           y2: y1 + this.r
//        });
//     }

//     //添加计算已清除的面积，达到标准值后，设置刮卡区域刮干净
//     let clearNum = parseFloat(this.r * this.r * len) / parseFloat(this.scale * this.totalArea);
//     if (!this.show) {
//        this.page.setData({
//           clearNum: parseFloat(this.r * this.r * len) / parseFloat(this.scale * this.totalArea)
//        })
//     };
//     if (this.startCallBack) this.startCallBack();
//     //console.log(clearNum)
//     if (clearNum > this.showPercent) {
//        //if (len && this.r * this.r * len > this.scale * this.totalArea) {
//        this.show = true;
//     }
//     this.clearArcFun(x, y, this.r, this.ctx);
//  }

// clearArcFun(x, y, r, ctx) {
//   let stepClear = 1;
//   clearArc(x, y, r);

//   function clearArc(x, y, radius) {
//      let calcWidth = radius - stepClear;
//      let calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth);

//      let posX = x - calcWidth;
//      let posY = y - calcHeight;

//      let widthX = 2 * calcWidth;
//      let heightY = 2 * calcHeight;

//      if (stepClear <= radius) {
//         ctx.clearRect(posX, posY, widthX, heightY);
//         stepClear += 1;
//         clearArc(x, y, radius);
//      }
//   }
// }

}