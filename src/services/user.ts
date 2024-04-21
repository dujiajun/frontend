import { NavigateFunction } from "react-router-dom";
import useSWR from "swr";

import { LoginResponse, User, UserPoint } from "@/lib/models";
import { fetcher, request } from "@/services/request";

export async function login(username: string, password: string) {
  const resp = await request("/oauth/login/", {
    method: "post",
    data: { username, password },
  });
  return resp.data;
}

export async function emailPasswordLogin(account: string, password: string) {
  const resp = await request("/oauth/email/login/", {
    method: "post",
    data: { account, password },
  });
  return resp.data;
}

export async function logout() {
  await request("/oauth/logout/");
  localStorage.removeItem("account");
}

export async function authEmailSendCode(account: string) {
  const resp = await request("/oauth/email/send-code/", {
    method: "post",
    data: { account },
  });
  return resp.data;
}

export async function authEmailVerifyCode(
  account: string,
  code: string
): Promise<LoginResponse> {
  const resp = await request("/oauth/email/verify/", {
    method: "post",
    data: { account, code },
  });
  return resp.data;
}

export async function resetEmailSendCode(account: string) {
  const resp = await request("/oauth/reset-password/send-code/", {
    method: "post",
    data: { account },
  });
  return resp.data;
}

export async function resetPassword(
  account: string,
  code: string,
  password: string
) {
  const resp = await request("/oauth/reset-password/reset/", {
    method: "post",
    data: { account, code, password },
  });
  return resp.data;
}

export function useUser() {
  const { data, error } = useSWR<User>("/api/me/", fetcher);
  if (data) data.account = localStorage.getItem("account");
  return {
    user: data,
    loading: !error && !data,
    error: error,
  };
}

export function useUserPoint() {
  const { data, error } = useSWR<UserPoint>("/api/points/", fetcher);
  return {
    points: data,
    loading: !error && !data,
    error: error,
  };
}

export function toAdmin() {
  window.location.href = "/admin/";
}

export function postLogin(
  data: LoginResponse,
  next: string,
  navigation: NavigateFunction
) {
  console.log(data)
  localStorage.setItem("account", data.account);
  if (next) {
    navigation(next);
  } else {
    navigation("/");
  }
}
