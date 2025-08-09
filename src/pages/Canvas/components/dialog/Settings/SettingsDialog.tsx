import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import useCanvasStore from "../../../data/CanvasStore";
import { X } from "lucide-react";
import { TabMenu } from "primereact/tabmenu";
import { useState } from "react";
import "./SettingsDialog.css";
import BackgroundSettings from "./BackgroundSettings";
import DrawingSettings from "./DrawingSettings";
import LayoutSettings from "./LayoutSettings";

function SettingsDialog() {
  const settingVisible = useCanvasStore((state) => state.settingVisible);
  const setSettingVisible = useCanvasStore((state) => state.setSettingVisible);
  const [settingActiveTab, setSettingActiveTab] =
    useState<SettingTabs>("background");

  type SettingTabs = "background" | "drawing" | "layout";

  const items = [
    {
      label: "Background",
      icon: "pi pi-image",
      command: () => setSettingActiveTab("background"),
    },
    {
      label: "Drawing",
      icon: "pi pi-pencil",
      command: () => setSettingActiveTab("drawing"),
    },
    {
      label: "Layout",
      icon: "pi pi-objects-column",
      command: () => setSettingActiveTab("layout"),
    },
  ];

  return (
    <Dialog
      modal
      header="Settings"
      visible={settingVisible}
      className="h-[90vh] w-[50vw] bg-white/10 backdrop-blur-sm rounded-l-2xl p-2 settings"
      onHide={() => {
        if (!settingVisible) return;
        setSettingVisible(false);
      }}
      content={({ hide }) => (
        <div className="flex flex-col p-4 h-full w-full gap-5">
          <div className="flex justify-between">
            <div className="text-5xl text-white">Settings</div>
            <div className="hover:cursor-pointer" onClick={(e) => hide(e)}>
              <X size={32} color="white" />
            </div>
          </div>

          <div className="card">
            <TabMenu
              model={items}
              activeIndex={items.findIndex(
                (item) => item.label.toLowerCase() === settingActiveTab
              )}
            />
          </div>

          <div className="flex-1 overflow-auto">
            {settingActiveTab === "background" && <BackgroundSettings />}
            {settingActiveTab === "drawing" && <DrawingSettings />}
            {settingActiveTab === "layout" && <LayoutSettings />}
          </div>

          <div className="flex justify-between gap-2">
            <Button
              label="Reset default settings"
              icon="pi pi-refresh"
              onClick={(e) => hide(e)}
              className="p-button-text text-white"
            />
            <div className="flex gap-5">
              <Button
                label="Discard"
                icon="pi pi-times"
                onClick={(e) => hide(e)}
                className="p-button-text text-white"
              />
              <Button
                label="Save"
                icon="pi pi-check"
                onClick={(e) => hide(e)}
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    />
  );
}

export default SettingsDialog;
