import React from "react";

class PaginationComponent extends React.Component {

    shouldShow() {
        return this.props.pagination && this.props.pages > 1;
    }

    getPageTiles() {
        const tiles = [];
        const currentPage = this.props.currentPage;
        const {left, right} = this.getLeftAndRightNumberOfPages(currentPage);

        if (currentPage > 0) {
            tiles.push(this.getPageTile(0, '⏪'));
            tiles.push(this.getPageTile(currentPage - 1, '◂'))
        }

        for (let i = left; i > 0; i--) {
            tiles.push(this.getPageTile(currentPage - i, currentPage - i + 1));
        }

        tiles.push(this.getPageTile(currentPage, currentPage + 1, true));

        for (let i=1; i<=right; i++) {
            tiles.push(this.getPageTile(currentPage + i, currentPage + i + 1));
        }

        if (currentPage < this.props.pages - 1) {
            tiles.push(this.getPageTile(currentPage + 1, '▸'));
            tiles.push(this.getPageTile(this.props.pages -1, '⏩'));
        }

        return tiles;
    }

    getPageTile(page, text, active = false) {
        return (
            <li className={active ? 'active': ''} key={`${page}-${text}`}>
                <a href="#" onClick={e => this.changePage(e, page)}>{text}</a>
            </li>
        );
    }

    getLeftAndRightNumberOfPages(currentPage) {
        const maxPages = this.props.maxPages > this.props.pages ?
            this.props.pages : this.props.maxPages;
        let left = Math.floor(maxPages / 2.0);
        let right = maxPages - (left + 1);

        if (currentPage - left < 0) {
            const delta = currentPage - left;
            left += delta;
            right -= delta;
        }

        if (currentPage + right >= this.props.pages) {
            const delta = this.props.pages - currentPage;
            left += delta;
            right -= delta;
        }

        return {left, right};
    }

    changePage(e, page) {
        e.preventDefault();
        this.props.changeToPage(page);
    }

    render() {
        if (!this.shouldShow()) {
            return null;
        }

        return (<div style={{textAlign: 'right'}}><ul className="pagination">{this.getPageTiles()}</ul></div>);
    }

}

PaginationComponent.propTypes = {
    pagination: React.PropTypes.bool.isRequired,
    pages: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.number.isRequired,
    maxPages: React.PropTypes.number.isRequired,
    changeToPage: React.PropTypes.func.isRequired
};

export default PaginationComponent;