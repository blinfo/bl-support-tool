"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var PaginatorComponent = /** @class */ (function () {
    function PaginatorComponent() {
        this.maxPages = 7;
        this.hidden = false;
        this.change = new core_1.EventEmitter();
        this.pager = [];
        this.subscriptions = [];
    }
    PaginatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.paginatorData$
            .pipe(operators_1.filter(function (page) { return !!page; }))
            .subscribe(function (data) {
            _this.paginate(data.currentPage, data.totalPages);
            _this.totalPages = data.totalPages;
            _this.currentPage = data.currentPage;
        }));
    };
    PaginatorComponent.prototype.onPageChange = function (pageNumber) {
        if (pageNumber <= this.totalPages &&
            pageNumber > 0 &&
            pageNumber !== this.currentPage &&
            typeof pageNumber === 'number' &&
            isFinite(pageNumber)) {
            this.currentPage = pageNumber;
            this.change.emit(pageNumber);
            this.paginate(this.currentPage, this.totalPages);
        }
    };
    PaginatorComponent.prototype.paginate = function (currentPage, totalPages) {
        this.pager = [];
        var startPage = 2;
        var startDots = false;
        var endDots = false;
        if (totalPages > 2 && totalPages < this.maxPages + 1) {
            this.pager = Array.from(Array(totalPages - 1).keys()).map(function (i) { return startPage + i; });
        }
        else {
            if (currentPage < this.maxPages - 2) {
                startPage = 2;
                endDots = true;
            }
            else if (currentPage > totalPages - (this.maxPages - 3)) {
                startPage = totalPages - 5;
                startDots = true;
            }
            else {
                startPage = currentPage - Math.floor((this.maxPages - 2) / 2);
                startDots = true;
                endDots = true;
            }
            this.pager = Array.from(Array(this.maxPages - 2).keys()).map(function (i) { return startPage + i; });
            if (startDots) {
                this.pager[0] = '...';
            }
            if (endDots) {
                this.pager[this.pager.length - 1] = '...';
            }
        }
    };
    __decorate([
        core_1.Input()
    ], PaginatorComponent.prototype, "paginatorData$", void 0);
    __decorate([
        core_1.Input()
    ], PaginatorComponent.prototype, "maxPages", void 0);
    __decorate([
        core_1.Input()
    ], PaginatorComponent.prototype, "hidden", void 0);
    __decorate([
        core_1.Output()
    ], PaginatorComponent.prototype, "change", void 0);
    PaginatorComponent = __decorate([
        core_1.Component({
            selector: 'app-paginator',
            templateUrl: './paginator.component.html',
            styleUrls: ['./paginator.component.css'],
        })
    ], PaginatorComponent);
    return PaginatorComponent;
}());
exports.PaginatorComponent = PaginatorComponent;
