package dev.alphasow.headless_cms.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Setter
public class PageResponse<T> {
    private List<T> data;
    private int totalPages;
    private long totalElements;
    private int size;
    private int number;

    public PageResponse(Page<T> page) {
        this.data = page.getContent();
        this.totalPages = page.getTotalPages();
        this.totalElements = page.getTotalElements();
        this.size = page.getSize();
        this.number = page.getNumber();
    }
}
