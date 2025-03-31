"use client";

import {
  Check,
  CircleAlert,
  Info,
  LoaderCircle,
  X,
} from "lucide-react";
import { ReactNode } from "react";
import {
  ExternalToast,
  Toaster as Sonner,
  toast as sonnerToast,
} from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "flex items-center gap-10 p-10 rounded-[0.5rem] text-raleway font-bold text-black z-20",
          description: "group-[.toast]:text-[#fafafa]",
          actionButton:
            "group-[.toast]:bg-[#707070] group-[.toast]:text-[#FAFAFA]",
          cancelButton:
            "group-[.toast]:bg-[#EFEFEF] group-[.toast]:text-[#D6D6D6]",
        },
      }}
      {...props}
    />
  );
};

const toast = {
  ...sonnerToast,
  success: (
    message: ReactNode,
    data: ExternalToast | undefined = {}
  ) => {
    return sonnerToast.success(message, {
      ...data,
      className: "border-[#308F9D] bg-[#AE0EEF0] space-x-4",
      icon: (
        <div className="bg-[#308F9D] p-1.5 rounded-full text-white">
          <Check size={20} className="stroke-white" />
        </div>
      ),
    });
  },
  error: (
    message: ReactNode,
    data: ExternalToast | undefined = {}
  ) => {
    return sonnerToast.error(message, {
      ...data,
      className: "border-red-500 bg-red-50 space-x-4 ",
      icon: (
        <div className="bg-red-500 p-1.5 rounded-full">
          <X size={20} className="stroke-red-50" />
        </div>
      ),
    });
  },
  warning: (
    message: ReactNode,
    data: ExternalToast | undefined = {}
  ) => {
    return sonnerToast.error(message, {
      ...data,
      className: "border-[#EAC02A] bg-yellow-50 space-x-4",
      icon: (
        <div className="bg-[#EAC02A] p-1.5 rounded-full">
          <CircleAlert size={20} className="stroke-yellow-50" />
        </div>
      ),
    });
  },
  info: (
    message: ReactNode,
    data: ExternalToast | undefined = {}
  ) => {
    return sonnerToast.message(message, {
      ...data,
      className: "border-[#5458F7] bg-[#EAEDF0] space-x-4",
      icon: (
        <div className="bg-[#5458F7] p-1.5 rounded-full">
          <Info size={20} className="stroke-[#EAEDF0]" />
        </div>
      ),
    });
  },
  loading: (
    message: ReactNode,
    data: ExternalToast | undefined = {}
  ) => {
    return sonnerToast.message(message, {
      ...data,
      className: "border-[#2F4A6A] bg-[#EAF4F5] space-x-4",
      icon: (
        <div className="bg-[#2F4A6A] p-1.5 rounded-full">
          <LoaderCircle
            size={20}
            className="animate-spin stroke-[#EAF4F5]"
          />
        </div>
      ),
    });
  },
};

export { Toaster, toast };
