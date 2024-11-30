package com.weiz.trendify.service.mapper;

import org.mapstruct.*;

import java.util.List;

public interface EntityMapper<D, E> {

    D toDto(E e);

    E toEntity(D d);

    List<D> toDtos(List<E> es);

    List<E> toEntities(List<D> ds);

    @Named("partialUpdate")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    void partialUpdate(@MappingTarget E e, D d);
}
