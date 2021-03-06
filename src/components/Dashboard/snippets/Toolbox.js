import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { recipientActions } from "actions/recipientActions";
import Filter from "./toolbox/Filter";
import RecipientButton from "./toolbox/RecipientButton";
import Search from "./toolbox/Search";
import FilterGroup from "./toolbox/FilterGroup";
import Download from "./toolbox/Download";

const Toolbox = ({
  user,
  search,
  onChange,
  filter,
  setFilter,
  filterList,
  addFilter,
  removeFilter,
  tag,
  upload,
  adding,
  setViewingTags,
  closeTags,
  viewingTags,
  exportButton,
  addButtonText,
  addButtonUrl,
  setModal,
  exportDocument,
  downloading,
}) => {
  const dispatch = useDispatch();

  const recipients = useSelector((state) => state.recipient);
  const userLabel = "administrator";
  const rightMargin50 = "right-margin-50";

  useEffect(() => {
    if (filterList === undefined) {
      dispatch(recipientActions.fetchTags());
    }
  }, [dispatch, filterList]);

  const viewTags = () => {
    setViewingTags(true);
  };

  const viewTagsClass = () => {
    if (upload === true) {
      return "right-margin-20";
    }

    return rightMargin50;
  };

  const parseCSV = (file) => {
    var reader = new FileReader();
    reader.readAsText(file.target.files[0], "UTF-8");
    reader.onload = function (e) {
      var csv = e.target.result;
      var allTextLines = csv.split("\n");
      const recipientArr = [];
      for (const textLine of allTextLines) {
        var data = textLine.split(",");
        var row = {
          name: data[0].replace(/[\r\n]+/gm, ""),
          email: data[1].replace(/[\r\n]+/gm, ""),
        };
        recipientArr.push(row);
      }
      dispatch(recipientActions.add(recipientArr, true));
    };
    file.target.value = null;
  };

  const renderDownloading = () => {
    if (downloading) {
      return (
        <ExportLoader className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </ExportLoader>
      );
    }

    return (
      <span className="material-icons mustard-color left-margin-0">
        arrow_drop_down
      </span>
    );
  };

  const renderFilterList = () => {
    if (filterList) {
      return filterList.map((t, index) => (
        <Filter
          index={index}
          name={t}
          checked={filter === t}
          key={index}
          onClick={() => (filter === t ? setFilter("") : setFilter(t))}
        />
      ));
    }

    if (recipients?.tags) {
      return recipients.tags.map((t, index) => (
        <Filter
          key={index}
          index={index}
          name={t.name}
          checked={filter.includes(t.name)}
          onClick={() =>
            filter.includes(t.name) ? removeFilter(t.name) : addFilter(t.name)
          }
        />
      ));
    } else {
      return (
        <div className="height-200 full-width display-flex align-items-center justify-center">
          <Loader className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </Loader>
        </div>
      );
    }
  };

  const renderAdditionText = () => {
    if (adding) {
      return (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }

    return <span>Upload CSV</span>;
  };

  const renderRecipientButton = () => {
    if (addButtonUrl) {
      return (
        <Link to={addButtonUrl}>
          <RecipientButton addButtonText={addButtonText} />
        </Link>
      );
    }

    return (
      <RecipientButton
        onClick={() => setModal("add-recipient")}
        addButtonText={addButtonText}
      />
    );
  };

  return (
    <ToolBox className="full-width top-margin-30 bottom-margin-5 display-flex space-between">
      <div className="display-flex align-items-center">
        <Search search={search} onChange={onChange} />
      </div>
      <div className="display-flex no-select">
        <FilterGroup renderFilterList={renderFilterList} />
        {exportButton === true && (
          <Download
            role={user?.data?.role}
            userLabel={userLabel}
            rightMargin50={rightMargin50}
            renderDownloading={renderDownloading}
            exportDocument={exportDocument}
          />
        )}
        {tag === true && (
          <ActionButton
            onClick={() => {
              viewingTags ? closeTags() : viewTags();
            }}
            className={`${viewingTags && "active-button"} 
                            ${viewTagsClass()} 
                            smooth display-flex align-items-center justify-center cursor-pointer left-padding-15 
                            right-padding-10 white border-radius-5 box-shadow-less2 size-pointeight-rem mustard-color`}
            data-test="active-btn1"
          >
            View Tags
          </ActionButton>
        )}
        {upload === true && (
          <>
            {user?.data?.role === userLabel && (
              <>
              <ActionButton
                onClick={() => {
                  document.getElementById("csv_file").click();
                }}
                className={`
                          ${adding && "active-button width-80"} 
                          smooth display-flex align-items-center justify-center cursor-pointer left-padding-15 
                          right-padding-10 white border-radius-5 box-shadow-less2 size-pointeight-rem mustard-color
                          right-margin-20 `}
                data-test="active-btn2"
              >
                {renderAdditionText()}
              </ActionButton>
               <ActionButton
               onClick={() => window.location.href = '/nibss-recipients-template.csv'}
               className={`
                         ${adding && "active-button width-80"} 
                         smooth display-flex align-items-center justify-center cursor-pointer left-padding-15 
                         right-padding-10 white border-radius-5 box-shadow-less2 size-pointeight-rem mustard-color
                         ${
                           user?.data?.role === userLabel
                             ? rightMargin50
                             : ""
               }`}
               data-test="active-btn2"
             >
             Download CSV Template
             </ActionButton>
             </>
            )}
            <input
              type="file"
              name="csv_file"
              id="csv_file"
              accept=".csv"
              onChange={parseCSV}
              className="width-0 height-0 border-box hide"
            />
          </>
        )}
        {user?.data?.role === userLabel && renderRecipientButton()}
      </div>
    </ToolBox>
  );
};

const ToolBox = styled.div`
  & > div:first-of-type span {
    color: #919aa3;
  }
  & input::placeholder {
    font-size: 0.9rem;
    color: #919aa3;
  }
  & input:focus::placeholder {
    color: #ccc;
  }
  & > div:first-of-type > div {
    width: 0;
    position: absolute;
    left: 30px;
    height: 1px;
    background: #9e7d0a;
    bottom: 0;
  }
`;

const ActionButton = styled.div`
  &.active-button {
    background: #9e7d0a !important;
    color: #fff !important;
  }
`;

const Loader = styled.div`
  width: 40px;
  height: 40px;
  & > div {
    width: 40px;
    height: 40px;
    border-color: #9e7d0a transparent transparent transparent;
  }
`;

const ExportLoader = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  & > div {
    width: 20px;
    height: 20px;
    border-color: #9e7d0a transparent transparent transparent;
  }
`;

export default Toolbox;
