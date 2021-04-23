import { StringFilter } from "@react3l/advanced-filters/StringFilter";
import { DEBOUNCE_TIME_300 } from "@react3l/react3l/config";
import { Model, ModelFilter } from "@react3l/react3l/core";
import { debounce } from "@react3l/react3l/helpers";
import { commonService } from "@react3l/react3l/services/common-service";
import classNames from "classnames";
import { ASSETS_IMAGE, ASSETS_SVG } from "config/consts";
import React, { RefObject } from "react";
import { ErrorObserver, Observable, Subscription } from "rxjs";
import { commonWebService } from "services/common-web-service";
import nameof from "ts-nameof.macro";
import InputSelect from "./../../Input/InputSelect/InputSelect";
import "./AdvanceIdFilter.scss";

export interface AdvanceIdFilterProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  value?: number;

  title?: string;

  modelFilter?: TModelFilter;

  searchProperty?: string;

  searchType?: string;

  placeHolder?: string;

  disabled?: boolean;
  
  isMaterial?: boolean;

  getList?: (TModelFilter?: TModelFilter) => Observable<T[]>;

  onChange?: (T: number) => void;

  render?: (t: T) => string;

  classFilter: new () => TModelFilter;
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

function AdvanceIdFilter(props: AdvanceIdFilterProps<Model, ModelFilter>) {
  const {
    modelFilter,
    title,
    value,
    searchProperty,
    searchType,
    placeHolder,
    disabled,
    isMaterial,
    getList,
    onChange,
    render,
    classFilter: ClassFilter,
  } = props;

  const [internalModel, setInternalModel] = React.useState<Model>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const [list, setList] = React.useState<Model[]>([]);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null,
  );

  const [subscription] = commonService.useSubscription();

  const handleLoadList = React.useCallback(() => {
    try {
      setLoading(true);
      subscription.add(getList);
      const filter = modelFilter ? { ...modelFilter } : new ClassFilter();
      getList(filter).subscribe(
        (res: Model[]) => {
          setList(res);
          setLoading(false);
        },
        (err: ErrorObserver<Error>) => {
          setList([]);
          setLoading(false);
        },
      );
    } catch (error) {}
  }, [getList, modelFilter, subscription, ClassFilter]);

  const handleToggle = React.useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setExpand(true);
      await handleLoadList();
    },
    [handleLoadList],
  );

  const handleCloseAdvanceIdFilter = React.useCallback(() => {
    setExpand(false);
  }, []);

  const handleClickItem = React.useCallback(
    (item: Model) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setInternalModel(item);
      onChange(item.id);
      handleCloseAdvanceIdFilter();
    },
    [handleCloseAdvanceIdFilter, setInternalModel, onChange],
  );

  const handleSearchChange = React.useCallback(
    debounce((searchTerm: string) => {
      const cloneModelFilter = modelFilter ? { ...modelFilter } : new ClassFilter();
      cloneModelFilter[searchProperty][searchType] = searchTerm;
      setLoading(true);
      subscription.add(getList);
      getList(cloneModelFilter).subscribe(
        (res: Model[]) => {
          setList(res);
          setLoading(false);
        },
        (err: ErrorObserver<Error>) => {
          setList([]);
          setLoading(false);
        },
      );
    }, DEBOUNCE_TIME_300),
    [modelFilter, searchProperty, searchType, getList],
  );

  const handleClearItem = React.useCallback(() => {
    onChange(null);
  }, [onChange]);

  React.useEffect(() => {
    const subscription = new Subscription();
    if (value !== null && value !== undefined) {
      const filterValue = new ClassFilter();
      filterValue["id"]["equal"] = Number(value);
      subscription.add(getList);
      getList(filterValue).subscribe((res: Model[]) => {
        if (res) {
          res = res.filter((current) => current.id === Number(value));
          setInternalModel(res[0]);
        }
      });
    } else {
      setInternalModel(null);
    }

    return function cleanup() {
      subscription.unsubscribe();
    };
  }, [value, getList, ClassFilter]);

  commonWebService.useClickOutside(wrapperRef, handleCloseAdvanceIdFilter);

  return (
    <>
      <div className='advance-id-filter__container' ref={wrapperRef}>
        {title && <div className='advance-id-filter__title'>{title}</div>}
        <div className='advance-id-filter__input' onClick={handleToggle}>
          <InputSelect
            model={internalModel}
            render={render}
            placeHolder={placeHolder}
            expanded={isExpand}
            disabled={disabled}
            isMaterial={isMaterial}
            onSearch={handleSearchChange}
            onClear={handleClearItem}
          />
        </div>
        {isExpand && (
          <div className='advance-id-filter__list-container'>
            {!loading ? (
              <div className='advance-id-filter__list'>
                {list.length > 0 ? (
                  list.map((item, index) => (
                    <div
                      className={classNames("advance-id-filter__item", {
                        "advance-id-filter__item--advance-id-filtered":
                          item.id === internalModel?.id,
                      })}
                      key={index}
                      onClick={handleClickItem(item)}
                    >
                      <span className='advance-id-filter__text'>
                        {render(item)}
                      </span>
                    </div>
                  ))
                ) : (
                  <img
                    className='img-emty'
                    src={ASSETS_IMAGE + '/no-data.png'}
                    alt=''
                  />
                )}
              </div>
            ) : (
              <div className='advance-id-filter__loading'>
                <img
                  className='img-loading'
                  src={ASSETS_SVG + '/spinner.svg'}
                  alt=''
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

AdvanceIdFilter.defaultProps = {
  searchProperty: nameof(Model.prototype.name),
  searchType: nameof(StringFilter.prototype.startWith),
  render: defaultRenderObject,
  isMaterial: false,
  disabled: false,
};

export default AdvanceIdFilter;
