import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { CanvasSettings } from "../../../data/types/CanvasTypes";
import { X } from "lucide-react";
import { TabMenu } from "primereact/tabmenu";
import { useRef, useState } from "react";
import "./SettingsDialog.css";
import BackgroundSettings from "./BackgroundSettings/BackgroundSettings";
import DrawingSettings from "./DrawingSettings";
import LayoutSettings from "./LayoutSettings";
import { DefaultSettings } from "../../../data/constants/SettingsConstants";
import { ConfirmPopup } from "primereact/confirmpopup";
import useCanvasStore from "../../../data/store/CanvasStore";
import ThemeToggle from "../../misc/ThemeToggle";

function SettingsDialog() {
  const setTheme = useCanvasStore().setTheme;
  const settingVisible = useCanvasStore((state) => state.settingVisible);
  const canvasSettings = useCanvasStore((state) => state.canvasSettings);
  const setSettingVisible = useCanvasStore((state) => state.setSettingVisible);
  const [currentCanvasSettings, setCurrentCanvasSettings] =
    useState<CanvasSettings | null>(DefaultSettings);

  const [settingActiveTab, setSettingActiveTab] =
    useState<SettingTabs>("background");

  const [defaultSettingsVisibleConf, setDefaultSettingsVisibleConf] =
    useState(false);
  const defaultButton = useRef(null);

  const resetSettings = useCanvasStore().reserToDefaultSettings;
  const discardSettings = useCanvasStore().discardSettings;
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
      className="h-[90vh]  w-[min(80vw,900px)] bg-white/10 backdrop-blur-sm rounded-l-2xl p-2 settings"
      onShow={() => {
        setCurrentCanvasSettings(canvasSettings);
      }}
      onHide={() => {
        if (!settingVisible) return;
        setSettingVisible(false);
      }}
      content={({ hide }) => (
        <div className="flex flex-col p-4 h-full w-full gap-5">
          <div className="flex justify-between items-center">
            <div className="text-5xl flex gap-4">
              Settings
              <ThemeToggle />
            </div>
            <div className="hover:cursor-pointer" onClick={(e) => hide(e)}>
              <X size={32}  />
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
            <ConfirmPopup
              target={defaultButton.current!}
              visible={defaultSettingsVisibleConf}
              onHide={() => setDefaultSettingsVisibleConf(false)}
              message="Are you sure you want to proceed?"
              icon="pi pi-exclamation-triangle"
              accept={() => {
                setTheme(DefaultSettings.theme);
                resetSettings();
                hide({
                  preventDefault: () => {},
                  stopPropagation: () => {},
                } as any);
              }}
            />
            <Button
              ref={defaultButton}
              label="Reset default settings"
              icon="pi pi-refresh"
              onClick={() => {
                setDefaultSettingsVisibleConf(true);
              }}
              className="p-button-text"
            />
            <div className="flex gap-5">
              <Button
                label="Discard"
                icon="pi pi-times"
                onClick={(e) => {
                  if (currentCanvasSettings) {
                    discardSettings(currentCanvasSettings);
                  }
                  hide(e);
                }}
                className="p-button-text"
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
