package com.newspringchurchapp;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.facebook.react.GoogleCastActivity;

public class MainActivity extends GoogleCastActivity {
  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
      return "newspringchurchapp";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this, R.style.BootTheme);
      super.onCreate(savedInstanceState);
      // ATTENTION: This was auto-generated to handle app links.
      Intent appLinkIntent = getIntent();
      String appLinkAction = appLinkIntent.getAction();
      Uri appLinkData = appLinkIntent.getData();
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
