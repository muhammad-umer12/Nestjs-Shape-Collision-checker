import { Rect } from './rect.model'
import { Circle } from './circle.model';
import { distanceBetween, Point, Shape, Type } from './shape.model'

export class Line implements Shape {

    readonly center: Point;
    readonly point: Point;
    readonly type: Type;

    constructor(x1: number, y1: number, x2: number, y2: number)
    {
        this.center =<Point>{x: x1, y: y1}
        this.point = <Point>{x:x2,y:y2}
        this.type = Type.LINE
    }

    collides(other: Shape): boolean {
        switch (other.type) {
            case Type.LINE:
                const _other = <Line>(<any>other);
             

                const x3= _other.center.x
                const y3= _other.center.y;
                const x4= _other.point.x
                const y4= _other.point.y;

               const collisionCheck = this.lineLineCollisionCheck(x3,y3,x4,y4)
               return collisionCheck
              


            case Type.CIRCLE:
              
                const circle: Circle = Circle.fromShape(other);
                
                var x1= this.center.x
                var y1= this.center.y;
                var x2= this.point.x
                var y2= this.point.y;
                var  b, c, d,  v1, v2;
                v1 = {};
                v2 = {};
                v1.x = x2 - x1;
                v1.y = y2 - y1;
                v2.x = x1 - circle.center.x;
                v2.y = y1 - circle.center.y;
                b = (v1.x * v2.x + v1.y * v2.y);
                c = 2 * (v1.x * v1.x + v1.y * v1.y);
                b *= -2;
                d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
              
                if(isNaN(d))
                { // no intercept
                  return  false
                }
                else
                {
                  return true;
                }       
          case Type.RECT:
                const rect: Rect = Rect.fromShape(other);
                const target: Point = rect.center;
            
                
                var rx = target.x;
                var ry = target.y;
                var rh = rect.height;
                var rw = rect.width;

                var left =   this.lineLineCollisionCheck(rx,ry,rx, ry+rh);
                var right =  this.lineLineCollisionCheck(rx+rw,ry, rx+rw,ry+rh);
                var top =    this.lineLineCollisionCheck(rx,ry, rx+rw,ry);
                var bottom = this.lineLineCollisionCheck(rx,ry+rh, rx+rw,ry+rh);
                if (left || right || top || bottom) {
                  return true;
              }
              return false;
          default:
              throw new Error(`Invalid shape type!`);    
          
        }
        //return false
    }


    /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Rect object
   */
  static fromShape(other: Shape): Line {
    const polymorph = <any>other;
    if (!polymorph.point.x || ! polymorph.point.y ) {
      throw new Error('Shape is invalid! Cannot convert to a ');
    }

    return new Line(
      polymorph.center.x,
      polymorph.center.y,
      polymorph.point.x,
      polymorph.height.y,
    );
  }

  
  /**
   * Checks if a line and other line collide
   * @param x1 x-coordinate of the point-1 of line-1
   * @param y1 y-coordinate of the point-1 of line-1
   * @param x2 x-coordinate of the point-2 of line-1
   * @param y1 y-coordinate of the point-2 of line-1
   * 
   * @param x3 x-coordinate of the point-1 of line-2
   * @param y3 y-coordinate of the point-1 of line-2
   * @param x4 x-coordinate of the point-2 of line-2
   * @param y4 y-coordinate of the point-2 of line-2
   * @returns a boolean if they collide or not
   */
   lineLineCollisionCheck(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    ) :boolean {
      let x3 = this.center.x;
      let y3 = this.center.y;
      let x4 = this.point.x;
      let y4 = this.point.y;
      var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

      var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
      if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return true;
    }
    return false;
  }
  
}