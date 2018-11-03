import { Component, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { SkyhookDndService } from "@angular-skyhook/core";
import { ItemTypes } from "./item-types";
import { DraggedItem } from "@angular-skyhook/sortable";
import { Output } from "@angular/core";
import { Card } from './card';

@Component({
    selector: 'kanban-day',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div *ngIf="collect$|async as c"
        class="day"
        [class.isOver]="c.isOver"
        [dropTarget]="target">
        <div>
            <i class="fas fa-calendar"></i>
            <span>Drop here to schedule</span>
        </div>
        <!--div class="space" [ngStyle]="getStyle(c.isOver, c.item)"></div-->
    </div>
    `,
    styles: [`
    .fas { margin-right: 8px; }
    .day {
        position: relative;
        margin: 8px;
        padding: 8px;
        font-weight: 700;
        text-shadow: 1px 1px rgba(255,255,255,0.2);
        border-radius: 4px;
        border: 1px dashed #000;
        text-align: center;
        height: 300px;
        width: 250px;
        //transform-origin: 100% 100%;
        //transition: transform 50ms ease-out;
    }
    .space {
        height: 0;
        width: 0;
        transition: all 50ms ease-out;
    }
    .isOver {
        //transition: transform 50ms ease-in;
        background: rgba(241, 152, 207, 0.7);
        //transform: scale(1.8);
    }
    `]
})
export class DayComponent {
    @Output() dropped = new EventEmitter<DraggedItem<Card>>();
    target = this.dnd.dropTarget<DraggedItem<Card>>(ItemTypes.CARD, {
        canDrop: monitor => {
            return monitor.getItem().isInternal;
        },
        drop: monitor => {
            this.dropped.emit(monitor.getItem());
        }
    });
    collect$ = this.target.listen(m => ({
        item: m.getItem(),
        isOver: m.isOver() && m.canDrop()
    }));
    constructor(private dnd: SkyhookDndService) { }
    getStyle(isOver: boolean, item: DraggedItem<Card>) {
        if (!isOver || !item) { return {} }
        //console.log(item.size.style());
        return {
            ...item.size.style(),
            transition: 'all 50ms ease-in'
        };
    }
}
